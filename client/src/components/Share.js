import { useNavigate, useParams } from "react-router-dom";
import React, {useState, useRef} from "react";
import QRCode from 'react-qr-code';

export default function Share({phone}) {
  const API = 'https://api.whatsapp.com/send?phone=';
  const link = API + phone;

  return (
    <div className="px-4 h-full overflow-auto mt-4">
      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center">
        <QRCode value={link} />
      </div>
    </div>
  );
}
