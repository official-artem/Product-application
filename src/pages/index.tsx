import { Inter } from 'next/font/google'
import Home from '@/components/screens/home/Home';
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ['latin'] })

export default function HomePage() {
  return <Home />
}
