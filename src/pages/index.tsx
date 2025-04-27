import { useEffect, useState } from "react"
import logo from '@/assets/images/logo.png';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import first_screenshot from '@/assets/images/first_screenshot.png';
import { Card, CardContent } from "@/components/ui/card";
import * as Icon from "react-bootstrap-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Head from 'next/head';
import { scroller } from "react-scroll";
import { handleError } from "@/core/utils/handle_error";

const Home = () => {
  const router = useRouter();
  const [isOpen, setOpen] = useState<Boolean>(false);

  const toSignup = () => {
    router.push('/signup');
  }

  const toLogin = () => {
    router.push('/login');
  }

  const openMenu = () => {
    setOpen(true);
  }

  const closeMenu = () => {
    setOpen(false);
  }

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  const toTelegram = () => {
    window.open('https://t.me/fyconst', '_blank');
  }

  return <>
    <Head>
      <title>LiveLift</title>
      <meta name="description" content="Kejar 4000 jam tayang YouTube tanpa ribet! Dengan LiveLift, channel Anda live nonstop dari server kami, tanpa boros kuota. Upload video sendiri atau pakai stok kami, live aman dan siap monetisasi." />
      <meta property="og:title" content="LiveLift" />
      <meta property="og:description" content="LiveLift adalah solusi live streaming otomatis ke YouTube tanpa harus online terus-menerus. Cocok untuk kreator yang ingin mengejar 4000 jam tayang dan 1000 subscriber dengan cara aman, praktis, dan hemat kuota. Streaming berjalan dari server kami, sehingga Anda bisa live kapan saja, di mana saja, tanpa menguras baterai atau internet pribadi. Upload konten Anda sendiri atau gunakan stok video kami, lalu biarkan channel Anda aktif 24/7 untuk meningkatkan jam tayang dan peluang monetisasi. Dengan harga terjangkau, setup cepat, dan support penuh, LiveLift siap bantu Anda mempercepat perjalanan menuju YouTube monetization!" />
      <meta property="og:image" content={logo.src} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <div className="bg-[#f2f7ff] font-base">
      <div className="flex bg-[#f2f7ff] fixed justify-center w-full">
        <div className="w-[1440px]">
          <nav className="sticky p-5 flex items-center justify-between w-full">
            <div className="logo">
              <img src={logo.src} alt="logo" className="h-9" />
            </div>
            <ul className="hidden lg:flex items-center gap-10 text-[#0d4c92] font-semibold text-lg">
              <li className="cursor-pointer">
                <a className="text-[16px]" onClick={() => handleScroll('home')}>Home</a>
              </li>
              <li className="cursor-pointer">
                <a className="text-[16px]" onClick={() => handleScroll('fitur')}>Fitur</a>
              </li>
              <li className="cursor-pointer">
                <a className="text-[16px]" onClick={() => handleScroll('harga')}>Harga</a>
              </li>
              <li className="cursor-pointer">
                <a className="text-[16px]" onClick={() => handleScroll('faq')}>FAQ</a>
              </li>
            </ul>
            <div className="hidden lg:flex gap-x-3">
              <Button onClick={toLogin} className="cursor-pointer" variant={"neutral"}>Login</Button>
              <Button onClick={toSignup} className="cursor-pointer">Daftar Sekarang</Button>
            </div>
            <div className="block lg:hidden">
              <Button onClick={openMenu} className="cursor-pointer">
                <Icon.List />
              </Button>
            </div>
          </nav>
          <div className={`bg-[#f2f7ff] fixed z-10 top-0 left-0 right-0 bottom-0 transition-all font-base space-y-4 p-5 flex flex-col justify-between ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-end w-full">
              <Button onClick={closeMenu} className="cursor-pointer">
                <Icon.XLg />
              </Button>
            </div>
            <ul className="flex flex-col items-center gap-y-8 text-[#0d4c92] font-medium text-xl">
              <li className="cursor-pointer">
                <a onClick={() => handleScroll('home')}>Home</a>
              </li>
              <li className="cursor-pointer">
                <a onClick={() => handleScroll('fitur')}>Fitur</a>
              </li>
              <li className="cursor-pointer">
                <a onClick={() => handleScroll('harga')}>Harga</a>
              </li>
              <li className="cursor-pointer">
                <a onClick={() => handleScroll('faq')}>FAQ</a>
              </li>
            </ul>
            <div className="flex gap-x-3 mt-10">
              <Button onClick={toLogin} className="cursor-pointer w-full" variant={"neutral"}>Login</Button>
              <Button onClick={toSignup} className="cursor-pointer w-full">Daftar Sekarang</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div id="home" className="w-[1440px] mt-6 lg:mt-24">
          <section className="px-5 flex flex-col lg:flex-row items-center gap-10 text-center my-24">
            <div className="flex flex-col gap-2.5 text-start">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light">LIVE KAN VIDEO MU DALAM</h1>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light">SEKALI KLIK</h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold">KEJAR JAM TAYANG SEGERA</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold">MONETISASI</p>
              <p className="text-md md:text-lg lg:text-xl my-5 font-normal">
                Livelift adalah platform yang membantu kamu untuk mendapatkan jam tayang di Youtube dengan cara yang lebih cepat dan mudah. Dengan menggunakan Livelift, kamu bisa mendapatkan jam tayang dengan cara yang lebih efektif dan efisien
              </p>
              <div className="flex">
                <Button size={"lg"} onClick={toSignup} className="cursor-pointer inline-flex">Daftar Sekarang</Button>
              </div>
            </div>
            <div className="screenshot">
              <img src={first_screenshot.src} alt="screenshot" className="w-full object-cover rounded border-5" />
            </div>
          </section>
        </div>
      </div>
    </div>
    <div className="bg-main border-t-5 border-b-5 py-5 lg:py-10 font-base">
      <div className="flex justify-center w-full">
        <div className="w-[1440px] text-white px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col gap-y-3 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-0">10+</h1>
              <p className="text-md md:text-lg lg:text-xl font-semibold">User Subscribed</p>
            </div>
            <div className="flex flex-col gap-y-3 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-0">7638+</h1>
              <p className="text-md md:text-lg lg:text-xl font-semibold">Minutes Stream</p>
            </div>
            <div className="flex flex-col gap-y-3 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-0">80+</h1>
              <p className="text-md md:text-lg lg:text-xl font-semibold">Video Uploaded</p>
            </div>
            <div className="flex flex-col gap-y-3 text-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-0">10+</h1>
              <p className="text-md md:text-lg lg:text-xl font-semibold">User Happy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="py-20 font-base">
      <div className="flex justify-center w-full">
        <div id="fitur" className="w-[1440px] text-black px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-20 mb-8 lg:mb-20">
            <h1 className="text-2xl lg:text-3xl font-bold mb-0">
              MENGAPA MEMILIH KAMI?
            </h1>
            <h1 className="text-md lg:text-lg font-normal mb-0">
              Livelift adalah platform yang membantu kamu untuk mendapatkan jam tayang di Youtube dengan cara yang lebih cepat dan mudah. Dengan menggunakan Livelift, kamu bisa mendapatkan jam tayang dengan cara yang lebih efektif dan efisien
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-4 lg:gap-y-8 text-start">
                  <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4 items-start lg:items-center">
                    <div className="bg-main size-14 rounded shadow-shadow flex items-center justify-center">
                      <Icon.CameraVideo className="size-7" />
                    </div>
                    <h1 className="font-bold text-lg lg:text-xl">Streaming Otomatis 24/7</h1>
                  </div>
                  <h6 className="mb-8 text-sm lg:text-md font-normal">
                    LiveLift bisa menjalankan live streaming ke YouTube tanpa henti, 24 jam sehari, 7 hari seminggu. Cocok untuk kejar jam tayang maksimal tanpa harus standby manual.
                  </h6>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-4 lg:gap-y-8 text-start">
                  <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4 items-start lg:items-center">
                    <div className="bg-main size-14 rounded shadow-shadow flex items-center justify-center">
                      <Icon.Globe2 className="size-7" />
                    </div>
                    <h1 className="font-bold text-lg lg:text-xl">Hemat Kuota 100%</h1>
                  </div>
                  <h6 className="mb-8 text-sm lg:text-md font-normal">
                    Karena LiveLift berjalan langsung dari server cloud kami, Anda tidak perlu menyalakan HP, laptop, atau modem. Streaming tetap jalan, kuota tetap aman.
                  </h6>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-4 lg:gap-y-8 text-start">
                  <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4 items-start lg:items-center">
                    <div className="bg-main size-14 rounded shadow-shadow flex items-center justify-center">
                      <Icon.Upload className="size-7" />
                    </div>
                    <h1 className="font-bold text-lg lg:text-xl">Upload Konten Sendiri</h1>
                  </div>
                  <h6 className="mb-8 text-sm lg:text-md font-normal">
                    Bebas gunakan video pribadi Anda untuk live, tanpa harus takut terkena klaim hak cipta. Atau, kalau mau praktis, kami juga sediakan stok video siap pakai.
                  </h6>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-4 lg:gap-y-8 text-start">
                  <div className="flex flex-col lg:flex-row gap-x-6 gap-y-4 items-start lg:items-center">
                    <div className="bg-main size-14 rounded shadow-shadow flex items-center justify-center">
                      <Icon.Clock className="size-7" />
                    </div>
                    <h1 className="font-bold text-lg lg:text-xl">Bisa Jadwalkan Live</h1>
                  </div>
                  <h6 className="mb-8 text-sm lg:text-md font-normal">
                    Tidak hanya 24/7, Anda juga bisa request live di jam-jam tertentu. Cocok untuk strategi optimasi prime time YouTube.
                  </h6>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-[#f2f7ff] font-base">
      <div className="flex justify-center w-full py-16 border-t-8 border-b-8">
        <div id="harga" className="w-[1440px] text-black px-5">
          <div className="flex flex-col mb-12">
            <h1 className="text-2xl lg:text-3xl font-bold mb-0">HARGA PAKET</h1>
            <h1 className="text-md lg:text-lg font-normal mb-0">Pilih paket yang sesuai untukmu</h1>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-8 text-start">
                  <div className="flex flex-col space-y-3 items-center justify-center">
                    <h1 className="font-bold text-lg">FREE</h1>
                    <h1 className="font-extrabold text-3xl">RP 0</h1>
                  </div>
                  <div className="text-left">
                    <ul className="mb-8 flex-col space-y-2 font-normal">
                      <li>✅ 3 Maksimal Live Bersamaan</li>
                      <li>❌ Max Quality 480p</li>
                      <li>❌ Support</li>
                      <li>❌ Loop Video</li>
                      <li>❌ Penjadwalan Live</li>
                      <li>❌ Watermark</li>
                      <li>❌ Custom Logo</li>
                    </ul>
                  </div>
                  <Button onClick={toSignup} size="lg" className="w-full">Daftar Sekarang</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-8 text-start">
                  <div className="flex flex-col space-y-3 items-center justify-center">
                    <h1 className="font-bold text-lg">CREATOR</h1>
                    <h1 className="font-extrabold text-3xl">RP 139K<span className="font-normal text-lg"> / Bulan</span></h1>
                  </div>
                  <div className="text-left">
                    <ul className="mb-8 flex-col space-y-2 font-normal">
                      <li>✅ 5 Maksimal Live Bersamaan</li>
                      <li>✅ Max Quality 1080p</li>
                      <li>✅ Full Support</li>
                      <li>✅ Loop Video</li>
                      <li>❌ Penjadwalan Live</li>
                      <li>❌ Watermark</li>
                      <li>❌ Custom Logo</li>
                    </ul>
                  </div>
                  <Button size="lg" onClick={toTelegram} className="w-full">Langganan Sekarang</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-8 text-start">
                  <div className="flex flex-col space-y-3 items-center justify-center">
                    <h1 className="font-bold text-lg">PREMIUM BEST SELLER 👍</h1>
                    <h1 className="font-extrabold text-3xl">RP 249K<span className="font-normal text-lg"> / Bulan</span></h1>
                  </div>
                  <div className="text-left">
                    <ul className="mb-8 flex-col space-y-2 font-normal">
                      <li>✅ 10 Maksimal Live Bersamaan</li>
                      <li>✅ Max Quality 1080p</li>
                      <li>✅ Full Support</li>
                      <li>✅ Loop Video</li>
                      <li>✅ Penjadwalan Live</li>
                      <li>✅ No Watermark</li>
                      <li>❌ Custom Logo</li>
                    </ul>
                  </div>
                  <Button size="lg" onClick={toTelegram} className="w-full">Langganan Sekarang</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="px-8">
                <div className="flex flex-col gap-y-8 text-start">
                  <div className="flex flex-col space-y-3 items-center justify-center">
                    <h1 className="font-bold text-lg">PRO</h1>
                    <h1 className="font-extrabold text-3xl">RP 499K<span className="font-normal text-lg"> / Bulan</span></h1>
                  </div>
                  <div className="text-left">
                    <ul className="mb-8 flex-col space-y-2 font-normal">
                      <li>✅ 15 Maksimal Live Bersamaan</li>
                      <li>✅ Max Quality 4K</li>
                      <li>✅ Full Support</li>
                      <li>✅ Loop Video</li>
                      <li>✅ Penjadwalan Live</li>
                      <li>✅ No Watermark</li>
                      <li>✅ Custom Logo</li>
                    </ul>
                  </div>
                  <Button size="lg" onClick={toTelegram} className="w-full">Langganan Sekarang</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    <div className="py-20 font-base">
      <div className="flex justify-center w-full">
        <div id="faq" className="w-[1440px] text-black px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-20 mb-8 lg:mb-20">
            <h1 className="text-2xl lg:text-3xl font-bold mb-0">
              FAQ
            </h1>
            <h1 className="text-md lg:text-lg font-normal mb-0">
              Temukan jawaban cepat untuk pertanyaan yang sering diajukan tentang layanan, fitur, dan cara penggunaan kami. Jika Anda masih memiliki pertanyaan, jangan ragu untuk menghubungi tim kami!
            </h1>
          </div>
          <div className="grid grod-cols-1 gap-4">
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Apa itu LiveLift?</AccordionTrigger>
                <AccordionContent>
                  LiveLift adalah layanan live streaming otomatis ke YouTube. Cocok untuk membantu channel Anda cepat memenuhi syarat monetisasi (4000 jam tayang & 1000 subscriber) tanpa perlu siaran manual.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Apakah LiveLift menghabiskan kuota internet saya?</AccordionTrigger>
                <AccordionContent>
                  Tidak. Streaming berjalan dari server kami, jadi Anda tidak perlu menyalakan HP atau laptop terus-menerus. Hemat kuota 100%!
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Apa yang saya butuhkan untuk mulai pakai LiveLift?</AccordionTrigger>
                <AccordionContent>
                  Cukup channel YouTube Anda dan video yang mau di-stream. Kami juga bisa bantu sediakan video jika Anda belum punya.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Bisa streaming 24 jam nonstop?</AccordionTrigger>
                <AccordionContent>
                  Bisa! Anda bebas pilih mau 24/7 atau sesuai jam yang Anda tentukan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Apakah aman untuk channel saya?</AccordionTrigger>
                <AccordionContent>
                  Aman. Kami mengikuti aturan YouTube, menggunakan metode stream yang natural, bukan spam. Konten Anda juga tidak melanggar hak cipta.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-main border-t-5 border-b-5 py-5 lg:py-10 font-base">
      <div className="flex justify-center w-full">
        <div className="w-[1440px] text-white px-5">
          <div className="flex text-center justify-center">
            © LiveLift 2025 All rights Reserved
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Home;