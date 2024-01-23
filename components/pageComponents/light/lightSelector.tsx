import sendToSpring from "@/modules/sendToSpring/sendToSpring";
import { useEffect, useState } from "react";
import Image from 'next/image';

import {Card, Col, Form, Row, Stack} from 'react-bootstrap';

type props = {
    // changeRoomSelector: (value: string) => void;
    setRoom: (fun:any) => void;
}
interface categoryInfo {
    name: string;
    nameKor: string;
}
interface roomInfo{
    room: string;
    state: string;
    kor: string;
    category: string;
    connect: string;
}
const categoryObj = [['balcony','베란다'], ['bath Room','화장실'], ['Big Room','큰방'],
['kitchen','부엌'], ['living Room','거실'], ['middle Room','중간방'], ['small Room','작은방']];

export default function LightSelector({setRoom}:props):JSX.Element {
    const [category, setCategory] = useState<categoryInfo[]>([]);
    const [roomList, setRoomList] = useState<roomInfo[]>([]);
    

    const [roomSelector, setRoomSelector] = useState(true);

    const changeCategory = async (value:string) => {
        if(value !== 'empty'){
            const response = await sendToSpring('/light/getRoomInfoList/'+value, 'GET', '','');
            if(response.result === 200){
                const arr:any = response.data;
                var tmpRoom:roomInfo[] = [];
                tmpRoom.push({
                    room: 'empty',
                    state: '',
                    kor: '선택하세요.',
                    category: '',
                    connect: '',
                });
                for(let idx in arr){
                    tmpRoom.push({
                        room: arr[idx].room,
                        state: arr[idx].state,
                        kor: arr[idx].kor,
                        category: arr[idx].category,
                        connect: arr[idx].connect,
                    });
                }
                setRoomList(tmpRoom);
                setRoomSelector(false);
            }
            else if(response.result >= 400 || response.result < 500){
    
            }
            else{
    
            }
        }
        else{
            setRoomSelector(true);
        }
    }

    const changeRoomSelector = async (value:string) => {
        if(value !== 'empty'){
            const response = await sendToSpring('/light/getRoomInfo/'+value, 'GET', '','');
            if(response.result === 200){
                const data:any = response.data;
                setRoom({
                    room: data.room,
                    category: data.category,
                    connect: data.connect,
                    kor: data.kor,
                    state: data.state,
                });
            }
            else if(response.result >= 400 || response.result < 500){
    
            }
            else{
    
            }
        }
        else{
            
        }
    }

    useEffect(() => {
        if(category.length === 0) {
            var tmpCategory:categoryInfo[] = [];
            tmpCategory.push({name:'empty', nameKor:'선택'});
            for(let obj in categoryObj) {
                tmpCategory.push({name:categoryObj[obj][0], nameKor:categoryObj[obj][1]});
            }
            setCategory(tmpCategory);
        }
    },[]);
    return (
        <div>
            <h2>Devices Selector</h2>
            <Card>
                <div className='content'>
                    <Stack direction='horizontal' gap={3} style={{margin:'1rem'}}>
                        <div style={{width:'50%'}}>
                            <p>Category</p>
                            <Form.Select onChange={(e)=>changeCategory(e.target.value)}>
                                {category.length !== 0 && (
                                    Array.from({length: category.length}).map((_, index:number) => (
                                        <option key={index} value={category[index].name}>{category[index].nameKor}</option>
                                    ))
                                )}
                            </Form.Select>
                        </div>
                        <div style={{width:'50%'}}>
                            <p>Room</p>
                            <Form.Select disabled={roomSelector} onChange={(e) => changeRoomSelector(e.target.value)}>
                                {roomSelector && (
                                    <option value='1'>카테고리 선택 필요</option>
                                )}
                                {!roomSelector && (
                                    Array.from({length: roomList.length}).map((_, index:number) => (
                                        <option key={index} value={roomList[index].room}>{roomList[index].kor}</option>
                                    ))
                                )}
                            </Form.Select>
                        </div>
                    </Stack>
                    
                </div>
                <style jsx>{`
                .content {
                    padding: 1px 16px;
                }
                `}</style>
            </Card>
        </div>
    )
}
