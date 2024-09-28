// import { Card } from "../ui/card";
// import { Button } from "../ui/button";
// import { useEffect, useState } from "react";
// import { CopyIcon } from "lucide-react";

// interface Props {
//     address: string;
// }

// export default function ClubAddress(props: Props) {

//     const [isCopied, setIsCopied] = useState<boolean>(false);

//     function copyAddrToClipboard() {
//         navigator.clipboard.writeText(props.address);
//         setIsCopied(true);
//     }

//     useEffect(() => {
//         if(isCopied) {
//             setTimeout(() => {
//                 setIsCopied(false);
//             }, 3000);
//         }
//     }, [isCopied]);

//     return (
//         <Card className="dark bg-black border-none w-fit flex flex-col items-center gap-2">
//             <div className="text-white font-oswald text-2xl">
//                 {
//                     isCopied ? "Address Copied." : "Your Club Address"
//                 }
//             </div>
//            <div className="flex flex-row p-2 rounded-3xl gap-2">
//            <div className="text-salmon text-xl overflow-hidden text-ellipsis">
//                 {props.address}
//             </div>
//             <CopyIcon className="hover:cursor-pointer" onClick={copyAddrToClipboard} />
//            </div>
//         </Card>
//     );
// }