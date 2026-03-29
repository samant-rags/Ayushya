import { motion, AnimatePresence } from "motion/react";
import { Leaf, Calendar as CalendarIcon, MapPin, Phone, Clock, Star, ChevronRight, Menu, X, ChevronLeft } from "lucide-react";
import { useState, useMemo } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval, 
  isBefore, 
  startOfToday 
} from "date-fns";

const services = [
  {
    title: "Panchakarma",
    description: "A comprehensive detoxification and rejuvenation program to balance the body's doshas.",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Abhyanga",
    description: "Traditional Ayurvedic oil massage that promotes relaxation and improves circulation.",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Shirodhara",
    description: "A soothing treatment where warm oil is gently poured over the forehead to calm the mind.",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Ayurvedic Consultation",
    description: "Personalized health assessments based on your unique constitution (Prakriti).",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "The Panchakarma treatment at Ayushya Ayurcare was life-changing. I feel more energetic and balanced than ever before.",
    rating: 5
  },
  {
    name: "Michael Chen",
    text: "Very professional and authentic. The Shirodhara treatment is incredibly relaxing. Highly recommended!",
    rating: 5
  },
  {
    name: "Anita Sharma",
    text: "The doctors here are very knowledgeable. They took the time to understand my concerns and provided a holistic plan.",
    rating: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
  ];

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const isDateDisabled = (date: Date) => isBefore(date, startOfToday());

  return (
    <div className="min-h-screen selection:bg-brand-accent/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-secondary/80 backdrop-blur-md border-b border-brand-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <Leaf className="text-brand-primary w-8 h-8" />
              <span className="text-2xl font-serif font-bold text-brand-primary tracking-tight">Ayushya Ayurcare</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-brand-primary transition-colors">About</a>
              <a href="#services" className="text-sm font-medium hover:text-brand-primary transition-colors">Services</a>
              <a href="#testimonials" className="text-sm font-medium hover:text-brand-primary transition-colors">Testimonials</a>
              <a href="#contact" className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
                Book Appointment
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-brand-secondary border-b border-brand-primary/10 px-4 py-6 flex flex-col gap-4"
          >
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif">About</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif">Services</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-lg font-serif">Testimonials</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-brand-primary text-white px-6 py-3 rounded-full text-center font-medium">
              Book Appointment
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2000" 
            alt="Ayurvedic Treatment" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              Authentic Ayurvedic Healing
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-light leading-[0.9] mb-8 text-brand-primary">
              Restore Your <br />
              <span className="italic font-normal">Natural Balance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Experience the ancient wisdom of Ayurveda at Ayushya Ayurcare. We provide personalized treatments to rejuvenate your body, mind, and soul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
                Start Your Journey <ChevronRight className="w-5 h-5" />
              </button>
              <button className="border border-brand-primary/20 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full text-lg font-medium hover:bg-white transition-all flex items-center justify-center gap-2">
                View Treatments
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-10 bottom-20 hidden lg:block"
        >
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50 max-w-xs">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <Star className="text-brand-accent fill-brand-accent w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-brand-primary">4.9/5 Rating</p>
                <p className="text-xs text-gray-500">From 500+ happy clients</p>
              </div>
            </div>
            <p className="text-sm italic text-gray-600">"The most authentic Ayurvedic experience I've had outside of Kerala."</p>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800" 
                  alt="Ayurvedic Herbs" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <div className="absolute -bottom-8 -right-8 bg-brand-primary p-8 rounded-[32px] text-white hidden sm:block shadow-2xl">
                <p className="text-4xl font-serif mb-1">15+</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Years of Excellence</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-brand-primary leading-tight">
                Ancient Wisdom for <br />
                Modern Living
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  At Ayushya Ayurcare, we believe that health is not just the absence of disease, but a state of complete physical, mental, and spiritual well-being.
                </p>
                <p>
                  Our center is dedicated to preserving and practicing the authentic traditions of Ayurveda. We use pure herbal oils and traditional techniques passed down through generations to help you achieve optimal health.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-brand-primary/10 p-1 rounded-full">
                      <Leaf className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-1">Pure Herbs</h4>
                      <p className="text-sm">100% natural and organic ingredients.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-brand-primary/10 p-1 rounded-full">
                      <Leaf className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary mb-1">Expert Doctors</h4>
                      <p className="text-sm">Certified Ayurvedic practitioners.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-brand-primary">Our Healing Treatments</h2>
            <p className="text-gray-600">Discover our range of traditional Ayurvedic therapies designed to address your specific health needs and promote deep relaxation.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-4 text-brand-primary">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{service.description}</p>
                  <button className="text-brand-primary font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all">
                    Learn More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-brand-primary">Voices of Healing</h2>
              <p className="text-gray-600">Hear from our clients about their transformative experiences at Ayushya Ayurcare.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-brand-primary">Trusted by many</p>
                <p className="text-gray-500">Join our community</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[40px] bg-brand-secondary border border-brand-primary/5 relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-accent fill-brand-accent" />
                  ))}
                </div>
                <p className="text-lg font-serif italic text-brand-primary mb-8 leading-relaxed">"{t.text}"</p>
                <p className="font-bold text-brand-primary">{t.name}</p>
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Verified Client</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">Visit Our Sanctuary</h2>
              <p className="text-white/70 text-lg mb-12 max-w-md">
                We are located in a peaceful environment, perfect for your healing journey. Reach out to book your consultation.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Our Location</h4>
                    <p className="text-white/60">123 Wellness Way, Green Valley,<br />Kerala, India 682001</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Phone Number</h4>
                    <p className="text-white/60">+91 98765 43210<br />+91 484 2345678</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Opening Hours</h4>
                    <p className="text-white/60">Mon - Sat: 8:00 AM - 7:00 PM<br />Sun: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[48px] p-8 md:p-12 text-brand-primary shadow-2xl">
              <h3 className="text-3xl font-serif mb-8">Book an Appointment</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Full Name</label>
                    <input type="text" className="w-full bg-brand-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Email Address</label>
                    <input type="email" className="w-full bg-brand-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Treatment Type</label>
                    <select className="w-full bg-brand-secondary border-none rounded-2xl p-4 focus:ring-2 focus:ring-brand-primary outline-none appearance-none">
                      <option>Select a treatment</option>
                      <option>Panchakarma</option>
                      <option>Abhyanga</option>
                      <option>Shirodhara</option>
                      <option>Consultation</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Selected Slot</label>
                    <div className="w-full bg-brand-secondary rounded-2xl p-4 flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 opacity-50" />
                      {selectedDate && selectedTime ? (
                        <span className="font-medium">{format(selectedDate, "MMM dd, yyyy")} at {selectedTime}</span>
                      ) : (
                        <span className="opacity-50 italic">Please select date & time below</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Interactive Calendar */}
                <div className="space-y-4 pt-4 border-t border-brand-primary/5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-sm uppercase tracking-widest opacity-50">Select Date</h4>
                    <div className="flex gap-2">
                      <button onClick={handlePrevMonth} className="p-2 hover:bg-brand-secondary rounded-full transition-colors">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-sm font-bold min-w-[100px] text-center">{format(currentMonth, "MMMM yyyy")}</span>
                      <button onClick={handleNextMonth} className="p-2 hover:bg-brand-secondary rounded-full transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <div key={d} className="text-[10px] font-bold uppercase opacity-30">{d}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, i) => {
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, new Date());
                      const isCurrentMonth = isSameMonth(day, currentMonth);
                      const disabled = isDateDisabled(day);

                      return (
                        <button
                          key={i}
                          disabled={disabled}
                          onClick={() => setSelectedDate(day)}
                          className={`
                            aspect-square rounded-xl text-xs font-medium transition-all flex items-center justify-center relative
                            ${!isCurrentMonth ? "opacity-20" : ""}
                            ${disabled ? "cursor-not-allowed opacity-10" : "hover:bg-brand-primary/10"}
                            ${isSelected ? "bg-brand-primary text-white hover:bg-brand-primary shadow-lg shadow-brand-primary/20" : ""}
                            ${isToday && !isSelected ? "text-brand-primary font-bold" : ""}
                          `}
                        >
                          {format(day, "d")}
                          {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-brand-primary rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Picker */}
                <AnimatePresence>
                  {selectedDate && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pt-4 border-t border-brand-primary/5 overflow-hidden"
                    >
                      <h4 className="font-bold text-sm uppercase tracking-widest opacity-50">Select Time</h4>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              py-2 px-1 rounded-xl text-[10px] font-bold transition-all border
                              ${selectedTime === time 
                                ? "bg-brand-primary text-white border-brand-primary shadow-md" 
                                : "bg-brand-secondary border-transparent hover:border-brand-primary/20"}
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest opacity-50">Message (Optional)</label>
                  <textarea className="w-full bg-brand-secondary border-none rounded-2xl p-4 h-24 focus:ring-2 focus:ring-brand-primary outline-none resize-none" placeholder="Tell us about your health concerns..."></textarea>
                </div>
                <button 
                  disabled={!selectedDate || !selectedTime}
                  className={`
                    w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3
                    ${selectedDate && selectedTime 
                      ? "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-xl shadow-brand-primary/20" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                  `}
                >
                  <CalendarIcon className="w-5 h-5" /> Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-brand-secondary border-t border-brand-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Leaf className="text-brand-primary w-6 h-6" />
              <span className="text-xl font-serif font-bold text-brand-primary">Ayushya Ayurcare</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Cookie Policy</a>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Ayushya Ayurcare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
