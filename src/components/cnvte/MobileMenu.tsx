'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Zap, Target, Award, Users, BookOpen, Camera, FileText, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface NavigationItem {
  name: string
  href: string
  icon: any
  color: string
  desc: string
}

interface MobileMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
  navigation: NavigationItem[]
}

export default function MobileMenu({ open, setOpen, navigation }: MobileMenuProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-8">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 shadow-xl">
                    
                    {/* Professional Header */}
                    <div className="px-4 mb-6 border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between">
                        <Link 
                          href="/" 
                          className="flex items-center space-x-3"
                          onClick={() => setOpen(false)}
                        >
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-xl font-bold text-slate-800">V-CNVTE</span>
                        </Link>
                        
                        <button
                          type="button"
                          className="relative rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Cerrar menú</span>
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Professional Navigation Items */}
                    <div className="relative flex-1 px-4">
                      <div className="space-y-1">
                        {navigation.map((item, index) => {
                          const IconComponent = item.icon
                          const isActive = index === 0 // Simulating active state for first item
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`group flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                                isActive
                                  ? 'bg-slate-800 text-white'
                                  : 'text-gray-700 hover:text-slate-800 hover:bg-gray-100'
                              }`}
                              onClick={() => setOpen(false)}
                            >
                              <IconComponent className={`w-5 h-5 ${
                                isActive ? 'text-white' : 'text-gray-500'
                              }`} />
                              <div className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className={`text-sm ${
                                  isActive ? 'text-gray-300' : 'text-gray-500'
                                }`}>
                                  {item.desc}
                                </span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Professional CTA Section */}
                    <div className="px-4 mt-6 border-t border-gray-200 pt-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                          ¿Listo para participar?
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Únete a la competencia más importante de vehículos eléctricos del país
                        </p>
                        <Link
                          href="/v-cnvte"
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                          onClick={() => setOpen(false)}
                        >
                          Participar Ahora
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}