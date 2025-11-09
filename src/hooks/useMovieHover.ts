import gsap from "gsap";

export function useMovieHover() {
  const handleMouseEnter = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1.05,
      boxShadow: "0 15px 25px rgba(0,0,0,0.6)",
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (el: HTMLDivElement) => {
    gsap.to(el, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return { handleMouseEnter, handleMouseLeave };
}
