import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image"; 

interface AvatarProps {
    src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <div>
            {src ? (
                <Image 
                    src={src}
                    alt="Avatar"
                    className="rounded-full"
                    width={30}
                    height={30}
                />
            ) : (
                <FaRegUserCircle size={30} />
            )}
        </div>
    );
}

export default Avatar;
