import { useEffect } from 'react';

const useAccordion = () => {
  useEffect(() => {
    const handleClick = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    };

    const links = document.querySelectorAll('a.page-scroll');
    links.forEach(link => link.addEventListener('click', handleClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, []);
};

export default useAccordion;
