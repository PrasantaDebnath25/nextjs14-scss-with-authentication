import Image from 'next/image';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import '../../scss/main.scss';

export default function LoadingScreen() {
    return (
        <div className="loader_page">
            {/* <Image src={LoaderImg} alt="" /> */}
            <AutorenewIcon />
        </div>
    );
}