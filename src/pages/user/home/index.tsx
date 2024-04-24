import { Fragment } from "react";
import Slider from "react-slick";

import CarouselImage_1 from "../../../assets/home-1.jpg";
import CarouselImage_2 from "../../../assets/home-2.jpg";
import CarouselImage_3 from "../../../assets/home-3.jpg";
import CarouselImage_4 from "../../../assets/home-4.jpg";
import CarouselImage_5 from "../../../assets/home-5.jpg";
import CarouselImage_6 from "../../../assets/home-6.avif";
import CarouselImage_7 from "../../../assets/home-7.jpg";
import CarouselImage_8 from "../../../assets/home-8.webp";
import CarouselImage_9 from "../../../assets/home-9.jpg";
import CarouselImage_10 from "../../../assets/home-10.webp";
import CarouselImage_11 from "../../../assets/home-11.jfif";
const HomePage = () => {
  const settings = {
    slidesToScroll: 1,
    slidesToShow: 2,
    speed: 500,
    autoplaySpeed: 7000,
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <section className="h-[420px] sm:h-[620px] mt-5 relative">
        <div className="container mx-auto">
          <Slider {...settings}>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_1}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_2}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_3}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_4}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_5}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_6}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_7}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_8}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_9}
                  alt="Carousel images"
                />
              </div>
            </div>
            <div className="h-96 sm:h-[600px]  ">
              <div className="h-full px-1 sm:px-10">
                <img
                  className="object-cover w-full h-full rounded-3xl "
                  src={CarouselImage_10}
                  alt="Carousel images"
                />
              </div>
            </div>
          </Slider>
        </div>
      </section>
      <section className="my-5">
        <div className="container">
          <h1 className="text-xl font-bold my-5 sm:px-10">
            “Andijon mexanika zavodi” sho‘ba korxonasi: eksport salohiyatini
            oshirmoqda
          </h1>
          <div className=" md:grid md:grid-cols-2 md:gap-5 sm:px-10 justify-between items-center">
            <p>
              “Andijon mexanika zavodi” ShK bosh korxonasi Andijon shahrida
              joylashgan bo‘lib, o‘zida nostandart, ehtiyot qismlar, yopiq
              vagonlar taʼmiri uchun yog‘ochni qayta ishlash va xalq isteʼmol
              mollari ishlab chiqarish bo‘linmalaridan tashkil topgan bo‘lib,
              hozirgi kunda ishlab chiqarilayotgan mahsulotlarning 80 foizdan
              ortig‘i mahalliylashtirilib, xalqaro bozorda muvaffaqiyatli
              sotilmoqda. Bugungi kunda “Andijon mexanika zavodi” sho‘ba
              korxonasi bir qator yuk vagonlari ishlab chiqaradi va taʼmirlaydi,
              jumladan, don tashuvchi xopper vagonlar, mineral o‘g‘itlar
              tashuvchi xopper vagonlar, kimyoviy yuklarni tashish uchun
              sisternalar, suyultirilgan uglevodorod gazlarini tashuvchi 15-9872
              rusumli sisterna vagonlar va boshqalar.
            </p>
            <div className="mt-4 sm:mt-0 rounded-lg overflow-hidden">
              <img src={CarouselImage_2} alt="Images" />
            </div>
          </div>
        </div>
        <div className="container">
          <h1 className="text-xl font-bold my-5 mt-10 sm:px-10">
            “Quyuv-mexanika zavodi” sho‘ba korxonasi ichki va xalqaro bozorda
            o'z mavqeini mustahkamlamoqda
          </h1>
          <div className=" md:grid md:grid-cols-2 md:gap-5 sm:px-10 justify-between items-center">
            <div className="mb-4 sm:mb-0 rounded-lg overflow-hidden">
              <img src={CarouselImage_11} alt="Images" />
            </div>
            <p>
              “O‘zbekiston temir yo‘llari” aksiyadorlik jamiyati tarkibidagi
              “Quyuv-mexanika zavodi” sho‘ba korxonasi tomonidan 2022 yil
              davomida sanoat mahsulotlarini ishlab chiqarish, tayyor mahsulot
              va xizmatlar eksporti bo‘yicha bir qator xususiy vagon parkiga ega
              xorijiy kompaniyalar bilan shartnomalar imzolandi va yuqori
              natijalar qayd etildi. Eksport salohiyatini jadal rivojlantirish
              borasida ushbu korxona Qozog‘iston, Belarus Respublikasi,
              Birlashgan Arab Amirliklari, Boltiqbo‘yi mamlakatlari Litva va
              Estoniya davlatlari bilan shartnomalar imzoladi.
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
