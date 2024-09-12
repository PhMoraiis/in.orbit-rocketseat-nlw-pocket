import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import Image from 'next/image'

export function EmptyGoals() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-8'>
      <Image src={'/images/logo-in-orbit.svg'} alt='logo' width={100} height={100} />
      <Image src={'/images/illustration.svg'} alt='logo' width={300} height={500} />
      <p className='text-zinc-300 leading-relaxed max-w-80 text-center'>
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo
        ?
      </p>
      <DialogTrigger asChild>
        <Button>
          <Plus className='size-4' /> Cadastrar Meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
