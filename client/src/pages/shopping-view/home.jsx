import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

// Image imports
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp'
import bannerFour from '../../assets/banner-4.jpg';
import bannerFive from '../../assets/banner-5.jpg';
import men2 from '../../assets/men2.jpg';
import women from '../../assets/women.jpg';
import kids from '../../assets/kids.jpg';
import accessories from '../../assets/accesories.jpg';
import shoes from '../../assets/shoes.jpg';
import nike from '../../assets/nike.jpg';
import adidas from '../../assets/adidas.jpg';
import hm from '../../assets/h&m.jpg';
import levis from '../../assets/levir.jpg';
import puma from '../../assets/puma.jpg';
import zara from '../../assets/zarar.jpg';

function ShoppingHome() {
  const [current, setCurrent] = useState(0);
  const slides = [bannerOne, bannerTwo, bannerThree,bannerFour,bannerFive];
  const navigate = useNavigate();

  const categories = [
    { id: 'men', label: 'Men', image: men2 },
    { id: 'women', label: 'Women', image: women },
    { id: 'kids', label: 'Kids', image: kids },
    { id: 'accessories', label: 'Accessories', image: accessories },
    { id: 'footwear', label: 'Footwear', image: shoes },
  ];

  const brands = [
    { id: 'nike', label: 'Nike', image: nike },
    { id: 'adidas', label: 'Adidas', image: adidas },
    { id: 'levi', label: "Levi's", image: levis },
    { id: 'zara', label: 'Zara', image: zara },
    { id: 'h&m', label: 'H&M', image: hm },
    { id: 'puma', label: 'PUMA', image: puma },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function handleNavigation(currentItem, section) {
    sessionStorage.setItem('filters', JSON.stringify({ [section]: [currentItem.id] }));
    navigate('/shopping/listing');
  }

  return (
    <div className='flex flex-col min-h-screen'>
      {/* Banner Section */}
      <div className='relative w-full h-[600px] overflow-hidden'>
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            className={`absolute top-0 left-0 w-full h-full object-cover object-right transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <Button onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)} className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronLeftIcon className='w-6 h-6' />
        </Button>
        <Button onClick={() => setCurrent((prev) => (prev + 1) % slides.length)} className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'>
          <ChevronRightIcon className='w-6 h-6' />
        </Button>
      </div>
      
      {/* Categories Section */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
            {categories.map((category) => (
              <Card key={category.id} onClick={() => handleNavigation(category, 'category')} className='cursor-pointer hover:shadow-xl transition-all'>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <img src={category.image} alt={category.label} className='w-24 h-24 object-cover rounded-full mb-4' />
                  <span className='font-bold'>{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop By Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
            {brands.map((brand) => (
              <Card key={brand.id} onClick={() => handleNavigation(brand, 'brand')} className='cursor-pointer hover:shadow-xl transition-all'>
                <CardContent className='flex flex-col items-center justify-center p-6'>
                  <img src={brand.image} alt={brand.label} className='w-24 h-24 object-cover rounded-full mb-4' />
                  <span className='font-bold'>{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-6 mt-12'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-center md:text-left'>&copy; 2025 Fashion Cart. All Rights Reserved.</p>
          <div className='flex gap-4 mt-4 md:mt-0'>
            <FaFacebook className='cursor-pointer hover:text-blue-500 transition' size={24} />
            <FaInstagram className='cursor-pointer hover:text-pink-500 transition' size={24} />
            <FaTwitter className='cursor-pointer hover:text-blue-400 transition' size={24} />
            <FaYoutube className='cursor-pointer hover:text-red-500 transition' size={24} />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ShoppingHome;
