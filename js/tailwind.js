// Tailwind Config

tailwind.config = {
  theme: {
    extend: {
      colors: {
        "bkash-pink": "#F18525",
        "bkash-black": "#000000",
        "bkash-white": "#FFFFFF",
        "accent-yellow": "#F7C948",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        "bounce-slow": "bounce-slow 3s infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
};


