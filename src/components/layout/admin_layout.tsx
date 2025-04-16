import Image from "next/image"
import React, { JSX, ReactNode } from "react"
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from '@/assets/images/logo.png';
import { navigationItem } from "@/core/navigation/navigation_item";
import { useRouter, usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export const AdminLayout = ({ children }: { children: ReactNode }): React.ReactElement => {
  const router = useRouter();
  const pathname = usePathname();

  return <>
    <div className="bg-gray-50">
      <div className="lg:ps-[320px] sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-background border-b-1 text-sm py-5">
        <nav className="relative px-5 flex basis-full items-center w-full mx-auto">
          <div className="me-5 shrink-0">
            <Input
              id="search"
              type="text"
              placeholder="Search..."
              required
            />
          </div>
          <div className="w-full flex items-stretch justify-end ms-auto gap-x-1 md:gap-x-3">
            <div className="flex flex-row items-stretch justify-end gap-1">
              <div className="border-l h-full border-black mx-3.5" />
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </nav>
      </div>
    </div>
    
    <div className="block end-auto bottom-0 translate-x-0 left-0 transition-all duration-300 transform h-full fixed inset-y-0 start-0 z-[60] bg-background border-e-1 border-black">
      <div className="relative flex h-full max-h-full w-[320px] flex-col">
        <div className="flex items-center justify-center border-b-1 border-black px-6 py-[20.5px]">
          <a className="flex items-center gap-x-2">
            <div onClick={() => { }}>
              <img src={Logo.src} alt="hris-logo" className="w-30" />
            </div>
          </a>
        </div>
        <div className="h-full overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:w-2">
          <nav className="flex w-full flex-col flex-wrap px-4 py-6">
            <ul className="flex flex-col space-y-3">
              {
                ...navigationItem.map((item, index) => {
                  const isActive = pathname.includes(item.href);

                  return <li key={index}>
                    <a onClick={() => router.push(item.href)} className={`cursor-pointer flex transition-all duration-200 bg-background items-center gap-x-2 px-4 py-2.5 border-1 ${isActive && 'border-1 shadow-shadow -translate-y-0.5 bg-main'} font-base rounded-sm`}>
                      {item.icon}
                      {item.label}
                    </a>
                  </li>
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div
      className="w-full lg:ps-[320px]">
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <main>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => router.push("/")}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => router.push(pathname)}>
                  {pathname.split('/').pop()?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h4 className="text-2xl font-bold text-gray-900 mt-2 mb-5">{pathname.split('/').pop()?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}</h4>
          {children}
        </main>
      </div>
    </div>
  </>
}