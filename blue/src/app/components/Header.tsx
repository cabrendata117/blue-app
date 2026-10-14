import Image from "next/image";
import Link from "next/link";
import { LOGO } from "../data/config";

const MENU = [
{ href: "/", texto: "Inicio" },
{ href: "/plasticos", texto: "Plásticos" },
{ href: "/centros", texto: "Centros" },
];

export default function Header() {
return (
    <header className="bg-blue-950 text-white">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          {/* IMAGEN: logo de Blue (public/logo_Blue.jpeg) */}
        <span className="relative block h-10 w-28 overflow-hidden rounded-md bg-white">
            <Image src={LOGO} alt="Logo Blue" fill className="object-contain p-1" priority />
        </span>
        </Link>
        <nav className="flex gap-6 text-sm font-semibold">
        {MENU.map((m) => (
            <Link key={m.href} href={m.href} className="hover:text-blue-300">{m.texto}</Link>
        ))}
        </nav>
    </div>
    </header>
);
}