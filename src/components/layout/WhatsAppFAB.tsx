import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../../constants/brands'

export default function WhatsAppFAB() {
  return (
    <a
      href={whatsappLink('Hello Bluemont, I would like to ask about your products.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-status-success text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  )
}
