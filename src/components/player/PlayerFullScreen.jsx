import { setFullScreenStatus } from '../../redux/player/actions';
import { requestFullScreenEnter, requestFullScreenExit } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { RiFullscreenFill } from 'react-icons/ri';
import { IconWrapper } from '../theme/IconWrapper';

export const PlayerFullScreen = () => {
    const dispatch = useDispatch();

    const { isFullScreen } = useSelector(state => state.player);

    const handleFullScreen = () => {
        if (!isFullScreen) {
            requestFullScreenEnter();
            dispatch(setFullScreenStatus(true));
        } else {
            requestFullScreenExit();
            dispatch(setFullScreenStatus(false));
        }
    };
    return (
        <div>
            <IconWrapper>
                <RiFullscreenFill onClick={() => handleFullScreen()} />
            </IconWrapper>
        </div>
    )
}