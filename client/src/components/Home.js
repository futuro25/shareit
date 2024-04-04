import React, {useState, useRef} from "react";
import QRCode from 'react-qr-code';
import Button from './common/Button';
import { config } from '../config';

export default function Home() {

  const API = 'https://api.whatsapp.com/send?phone=';
  const [link, setLink] = useState(API);
  const [message, setMessage] = useState("Copiar");
  const phoneRef = useRef()

  const onChange = (e) => {
    setLink(API + e.target.value)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(config.baseUrl + "/share?phone=" + phoneRef.current?.value)
    setMessage("Copiado!")
    setTimeout(
      () => setMessage("Copiar"), 
      3000
    );
  }

  return (
    <div className="px-4 h-full overflow-auto mt-4">
      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center mt-10">
        <h1 className="inline-block text-gray-500 text-3xl">
          Bienvenido a ShareIt
        </h1>
        <p className="text-gray-500 text-sm italic">comparti tus datos con el mundo</p>
      </div>

      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center mt-10">
        <p className="pb-2 text-gray-500">Ingresa aca tu nro de celular 👇</p>
        <input type="number" ref={phoneRef} onChange={onChange} className="w-64 text-center rounded border border-slate-200 p-4 text-slate-500 text-2xl" placeholder="5491158888423" />
      </div>
      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center">
        <QRCode value={link} />
      </div>
      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center">
        Comparti tu codigo QR
      </div>
      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center">
        {phoneRef.current?.value && (
            <Button onClick={() => { copyToClipboard()}}>{message}</Button>
          )
        }
      </div>
      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center mt-10">
        Envia una mensaje directamente
      </div>
      <div className="w-full flex flex-col sticky top-0 z-10 bg-white rounded pb-4 items-center justify-center">
        {
          phoneRef.current?.value ? (
            <a target="_blank" href={link}>Link 👉 {phoneRef.current?.value}</a>
          ) : (
            <p>Cuando ingreses tu numero vas a ver tu link directo</p>
          )
        }
      </div>
    </div>
  );
}
