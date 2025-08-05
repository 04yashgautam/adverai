/** @type {import('tailwindcss').Config} */
export default {

	content: [
    	"./index.html",
    	"./src/**/*.{js,ts,jsx,tsx}"
  	],

	darkMode: ["class"],
    // content: [],
  theme: {
  	extend: {
		animation: {
        	'pulse-bounce': 'pulse-bounce 2s ease-in-out',
			borderGlow: 'borderGlow 2.5s ease-in-out infinite',
      	},

		keyframes: {
			borderGlow: {
				'0%, 100%': { boxShadow: '0 0 5px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)' },
				'50%': { boxShadow: '0 0 15px rgba(255,255,255,0.6), 0 0 25px rgba(255,255,255,0.4)' },
			},
			'pulse-bounce': {
			'0%, 100%': { transform: 'scale(1)' },
			'50%': { transform: 'scale(1.05)' },
			}
      	},



  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

