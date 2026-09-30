const serif = ['Playfair Display', 'serif'], sans = ['Plus Jakarta Sans', 'sans-serif']
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { surface:'#fff9ef', 'surface-container':'#f3ede4', 'surface-container-high':'#ede7df', 'surface-container-highest':'#e7e2d9', 'surface-container-low':'#f9f3ea', 'surface-container-lowest':'#ffffff', primary:'#31140a', 'primary-container':'#4a281d', 'on-primary':'#ffffff', 'primary-fixed':'#ffdbd0', 'on-primary-fixed':'#301309', secondary:'#89502c', 'on-secondary':'#ffffff', 'secondary-container':'#feb386', 'on-secondary-container':'#78431f', 'secondary-fixed':'#ffdbc8', 'on-secondary-fixed':'#321200', tertiary:'#112006', 'on-tertiary':'#ffffff', 'tertiary-container':'#263518', 'on-tertiary-container':'#8c9f79', 'tertiary-fixed':'#d5e9bf', 'on-tertiary-fixed':'#111f05', 'on-surface':'#1d1b16', 'on-surface-variant':'#514440', 'outline-variant':'#d5c3bd' },
    borderRadius: { DEFAULT:'0.25rem', lg:'0.5rem', xl:'0.75rem', full:'9999px' },
    spacing: { 'space-xxs':'0.25rem','space-xs':'0.5rem','space-sm':'0.75rem','space-md':'1rem','space-lg':'1.5rem','space-xl':'2rem','space-2xl':'3rem','space-3xl':'4rem','margin-mobile':'1.25rem','margin-desktop':'2.5rem' },
    fontFamily: { display:serif,'headline-md':serif,'headline-lg':serif,'headline-sm':serif,'body-md':sans,'body-sm':sans,'body-lg':sans,'title-md':sans,'title-sm':sans,'label-lg':sans,'label-md':sans,'label-sm':sans },
    fontSize: {
      display:['48px',{lineHeight:'56px',letterSpacing:'-0.02em',fontWeight:'600'}],
      'headline-lg':['32px',{lineHeight:'40px',fontWeight:'600'}],'headline-md':['22px',{lineHeight:'30px',fontWeight:'500'}],'headline-sm':['18px',{lineHeight:'26px',fontWeight:'500'}],
      'body-lg':['16px',{lineHeight:'26px'}],'body-md':['14px',{lineHeight:'22px'}],'body-sm':['12px',{lineHeight:'18px'}],
      'title-md':['16px',{lineHeight:'24px',fontWeight:'700'}],'title-sm':['14px',{lineHeight:'20px',fontWeight:'600'}],
      'label-lg':['14px',{lineHeight:'20px',fontWeight:'600'}],'label-md':['12px',{lineHeight:'16px',fontWeight:'600'}],'label-sm':['10px',{lineHeight:'14px',fontWeight:'700'}] } } }
}
