"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import emailjs from '@emailjs/browser';
import { FormData } from './types';
import { 
  EMAIL_PLACEHOLDER, 
  RESPONSE_TIME_MESSAGE, 
  SUBMIT_ERROR_MESSAGE, 
  SUBMIT_SUCCESS_MESSAGE,
  EMAIL_SERVICE_ID,
  EMAIL_USER_TEMPLATE_ID,
  EMAIL_ADMIN_TEMPLATE_ID,
  EMAIL_PUBLIC_KEY
} from './constants';
import { Mail } from 'lucide-react';
import { CheckIcon } from '../ui/icons';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      await Promise.all([
        // Send confirmation email to user
        emailjs.send(
          EMAIL_SERVICE_ID,
          EMAIL_USER_TEMPLATE_ID,
          {
            to_email: data.email,
            to_name: `${data.firstName} ${data.lastName}`,
            message: 'Gracias por contactarnos. Hemos recibido su mensaje y le responderemos pronto.',
          },
          EMAIL_PUBLIC_KEY
        ),
        // Send notification email to admin
        emailjs.send(
          EMAIL_SERVICE_ID,
          EMAIL_ADMIN_TEMPLATE_ID,
          {
            from_name: `${data.firstName} ${data.lastName}`,
            from_email: data.email,
            message: data.message
          },
          EMAIL_PUBLIC_KEY
        )
      ]);

      reset();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      alert(SUBMIT_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="font-playfair flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-3/5 bg-gray-800 p-6 lg:p-10 flex flex-col justify-center">
        <div className="max-w-xl mx-auto pt-32">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Escríbanos
          </h1>
          <p className="text-white mb-6 text-base">
            Si tiene preguntas sobre nuestros servicios, hacer una consulta o simplemente necesita más información, contáctanos.
          </p>
          
          <div>
            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-2xl mb-2 text-white font-medium">Nuestro Correo</h3>
              <a 
                href="mailto:lamuestracreativa@gmail.com" 
                className="text-white text-base flex items-center hover:text-blue-300 transition-colors"
              >
                <Mail className="mr-2" size={20} />
                lamuestracreativa@gmail.com
              </a>
            </div>

            {/* Form in a Card */}
            <div className="bg-white rounded-xl shadow-lg p-5">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mb-3">
                    <CheckIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{SUBMIT_SUCCESS_MESSAGE}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre*
                      </label>
                      <Input
                        id="firstName"
                        {...register('firstName', { required: 'Nombre es requerido' })}
                        className="focus:border-blue-500 focus:ring-blue-500"
                        aria-invalid={errors.firstName ? "true" : "false"}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido*
                      </label>
                      <Input
                        id="lastName"
                        {...register('lastName', { required: 'Apellido es requerido' })}
                        className="focus:border-blue-500 focus:ring-blue-500"
                        aria-invalid={errors.lastName ? "true" : "false"}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email*
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={EMAIL_PLACEHOLDER}
                      {...register('email', { 
                        required: 'Email es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email inválido"
                        } 
                      })}
                      className="focus:border-blue-500 focus:ring-blue-500"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email ? (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">{RESPONSE_TIME_MESSAGE}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje*
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      {...register('message', { required: 'Mensaje es requerido' })}
                      placeholder="Cuéntenos cómo podemos ayudarle"
                      className="h-[100px] focus:border-blue-500 focus:ring-blue-500"
                      aria-invalid={errors.message ? "true" : "false"}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="text-right">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-2"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 h-85 lg:h-auto relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 from-0% via-gray-800/80 via-30% to-gray-800/20 lg:bg-gradient-to-r lg:from-gray-800 lg:via-gray-800/30 lg:to-transparent z-10"></div>
        <img
          src="/marta_caro_4.jpg"
          alt="Contact Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}