import Image from "next/image";
import { intro, profile } from "@content/profile";
import profileImage from "../../../img/profile_img.jpg";

export function Hero() {
  return (
    <header className="flex flex-col-reverse gap-8 pb-14 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-accent">{profile.role}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{profile.name}</h1>
        <p className="mt-6 leading-relaxed">{intro}</p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <a href={`mailto:${profile.email}`} className="link-underline">
              {profile.email}
            </a>
          </li>
          <li>
            <a href={profile.github} className="link-underline" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <Image
        src={profileImage}
        alt={`${profile.name} 프로필 사진`}
        priority
        sizes="144px"
        className="w-28 shrink-0 rounded-lg border border-line sm:w-36"
      />
    </header>
  );
}
