import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { TransitionGroup, Transition } from 'react-transition-group';

interface IProps {
	children: ReactNode;
}

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted'; // Include 'exited' in the type

const TIMEOUT = 150;

const getTransitionStyles: Record<TransitionStatus, React.CSSProperties> = {
    entering: {
        position: 'absolute',
        opacity: 0
    },
    entered: {
        transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
        opacity: 1
    },
    exiting: {
        transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
        opacity: 0
    },
    exited: {
        
    },
    unmounted: {
        
    }
};

const Layout = ({ children }: IProps) => {
	const router = useRouter();
	return (
		<div className='relative h-[100%]'>
			<TransitionGroup style={{ position: 'relative' }}>
				<Transition
					key={router.pathname}
					timeout={{
						enter: TIMEOUT,
						exit: TIMEOUT
					}}>
					{(status) => (
						<div
							style={{
								...getTransitionStyles[status]
							}}>
							<main>
								<div className='h-[100%] w-[100%] p-[2em] '>{children}</div>
							</main>
						</div>
					)}
				</Transition>
			</TransitionGroup>
		</div>
	);
};

export default Layout;