import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.8); }
    to { opacity: 1; transform: scale(1); }
  }

  .animate-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.7s ease-out forwards;
  }
  .animate-slide-left {
    opacity: 0;
    animation: slideInLeft 0.7s ease-out forwards;
  }
  .animate-slide-right {
    opacity: 0;
    animation: slideInRight 0.7s ease-out forwards;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 8s ease-in-out infinite 2s;
  }

  .shimmer-effect::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transform: translateX(-100%) skewX(-15deg);
  }
  .shimmer-effect:hover::after {
    animation: shimmer 0.8s ease-out;
  }

  .contact-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .contact-card:hover {
    transform: translateY(-4px) scale(1.02);
  }
  .contact-card:hover .contact-icon {
    transform: scale(1.15) rotate(8deg);
  }
  .contact-card:hover .contact-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  .contact-icon {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .contact-arrow {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  .form-field {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .form-field:focus-within {
    transform: scale(1.01);
  }
  .form-field:focus-within label {
    color: hsl(var(--accent));
  }
  .form-field:focus-within .field-line {
    width: 100%;
  }
  .field-line {
    width: 0;
    transition: width 0.4s ease;
  }

  .btn-primary-animated {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-primary-animated:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px -10px hsl(var(--accent) / 0.5);
  }
  .btn-primary-animated:active {
    transform: translateY(0) scale(0.98);
  }

  .btn-outline-animated {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-outline-animated::before {
    content: '';
    position: absolute;
    inset: 0;
    background: hsl(var(--accent));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }
  .btn-outline-animated:hover::before {
    transform: scaleX(1);
  }
  .btn-outline-animated:hover {
    color: hsl(var(--accent-foreground));
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 10px 40px -10px hsl(var(--accent) / 0.4);
  }
  .btn-outline-animated:active {
    transform: translateY(0) scale(0.98);
  }

  .form-container {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .form-container:hover {
    box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.15);
  }

  .submit-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px -10px hsl(var(--accent) / 0.5);
  }
  .submit-btn:active {
    transform: translateY(0) scale(0.97);
  }
  .submit-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }
  .submit-btn:hover::before {
    left: 120%;
  }

  .spinner {
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .input-enhanced {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .input-enhanced:focus {
    box-shadow: 0 0 0 3px hsl(var(--accent) / 0.15), 0 4px 12px -2px rgba(0,0,0,0.08);
    border-color: hsl(var(--accent));
  }
  .input-enhanced:hover:not(:focus) {
    border-color: hsl(var(--accent) / 0.5);
  }

  .section-line {
    transition: width 0.5s ease;
  }
  .section-line:hover {
    width: 6rem;
  }
`;

interface ContactInfoItem {
  icon: React.ElementType;
  title: string;
  content: string;
  gradient: string;
  link?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!formData.mobileNumber.trim() || !/^[0-9]{10}$/.test(formData.mobileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/majesticdigital01@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.mobileNumber,
          email: formData.email,
          city: formData.city,
          _subject: 'New Enquiry from Mount Castle Contact Form',
          Source: 'Mount Castle Contact Form',
          Date: new Date().toLocaleString()
        })
      });
      
      if (response.ok) {
        toast.success('Thank you! We will contact you shortly.', {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        });
        setFormData({ fullName: '', mobileNumber: '', email: '', city: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Show success message anyway (as per your popup logic)
      toast.success('Thank you! We will contact you shortly.', {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      });
      setFormData({ fullName: '', mobileNumber: '', email: '', city: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Majestic Realties - NIBM Branch, Aditya Business Center, First Floor (A Part), NIBM Rd, Above Titan Showroom, Opp Icici Bank, Near Jyoti Hotel, Kondhwa, Pune, Maharashtra 411048',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 8600277794',
      gradient: 'from-green-500 to-emerald-500',
      link: 'tel:+918600277794',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'majesticdigital01@gmail.com',
      gradient: 'from-purple-500 to-pink-500',
      link: 'mailto:majesticdigital01@gmail.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Monday - Sunday: 10:00 AM - 6:00 PM',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const formFields = [
    { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
    { name: 'mobileNumber', label: 'Mobile Number', type: 'tel', placeholder: 'Enter 10-digit mobile number' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      <section
        ref={sectionRef}
        id="contact"
        className="py-20 md:py-32 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden"
      >
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-float"
            style={{ background: 'hsl(var(--accent) / 0.08)' }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-float-delayed"
            style={{ background: 'hsl(var(--primary) / 0.06)' }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-12 max-w-2xl">
            <div
              className={`h-1 w-16 bg-gradient-to-r from-accent to-accent/40 mb-6 rounded-full section-line cursor-pointer ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            />
            <h2
              className={`text-4xl md:text-5xl font-bold text-foreground mb-4 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ fontFamily: 'var(--font-display)', animationDelay: '100ms' }}
            >
              Get in Touch
            </h2>
            <p
              className={`text-lg text-muted-foreground leading-relaxed ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '200ms' }}
            >
              Have questions about Mount Castle? Our team is here to help. Contact us today to schedule a site visit.
            </p>
          </div>

          {/* Contact Layout — reduced gap */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                const cardContent = (
                  <div
                    key={index}
                    className={`contact-card flex items-start gap-4 p-5 rounded-xl bg-background/50 backdrop-blur-sm border border-transparent hover:border-accent/20 hover:bg-white hover:shadow-xl cursor-pointer ${
                      isVisible ? 'animate-slide-left' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 120 + 300}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`contact-icon flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg font-bold text-foreground mb-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed break-words">
                        {item.content}
                      </p>
                    </div>
                    <div className="contact-arrow flex-shrink-0 self-center">
                      <ArrowRight className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                );

                return item.link ? (
                  <a key={index} href={item.link} className="block no-underline">
                    {cardContent}
                  </a>
                ) : (
                  <div key={index}>{cardContent}</div>
                );
              })}

              {/* Action Buttons */}
              <div
                className={`pt-6 flex flex-col sm:flex-row gap-4 ${
                  isVisible ? 'animate-slide-left' : 'opacity-0'
                }`}
                style={{ animationDelay: '780ms' }}
              >
                <a
                  href="tel:+918600277794"
                  className="btn-primary-animated shimmer-effect relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/85 text-accent-foreground font-semibold rounded-xl shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span className="relative z-10">Call Now</span>
                </a>
                <a
                  href="https://wa.me/918600277794"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-animated flex items-center justify-center gap-3 px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl"
                >
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Enquiry Form */}
            <div
              className={`form-container bg-white p-7 md:p-8 rounded-2xl border border-border/50 shadow-xl ${
                isVisible ? 'animate-slide-right' : 'opacity-0'
              }`}
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                  <Send className="w-5 h-5 text-accent" />
                </div>
                <h3
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Send an Enquiry
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.map((field, index) => (
                  <div
                    key={field.name}
                    className={`form-field ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 80 + 500}ms` }}
                  >
                    <label className="block text-sm font-semibold text-foreground mb-2 transition-colors duration-300">
                      {field.label} <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      placeholder={field.placeholder}
                      className="input-enhanced w-full rounded-lg"
                    />
                    <div className="field-line h-0.5 bg-accent mt-0.5 rounded-full" />
                  </div>
                ))}

                {/* Submit */}
                <div
                  className={`pt-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: '820ms' }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-btn w-full bg-gradient-to-r from-accent to-accent/85 hover:from-accent/90 hover:to-accent text-accent-foreground font-semibold py-6 text-base rounded-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-3">
                        <span className="spinner w-5 h-5" />
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Submit Enquiry
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}