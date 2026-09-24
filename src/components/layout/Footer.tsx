import React from 'react';
import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Mail, MessageCircle, MapPin } from 'lucide-react';
import { formatPhone, whatsappPhone, whatsappUrl } from '@chepelcr/tsuru-storefront-sdk';
import { useSubdomainContext } from '@/contexts/SubdomainContext';
import { useContact, useTheme } from '@/hooks/useContent';
import { PawIcon } from '../PawPrintDecoration';
import { DogIcon, CatIcon, BirdIcon } from '../PetIcons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { organization } = useSubdomainContext();
  const { data: theme } = useTheme();
  const { data: contact } = useContact();
  const storeWhatsapp = whatsappPhone(contact);

  return (
    <footer className="bg-card border-t border-border mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-2xl">
                
                {theme?.logoUrl ? (
                  <img src={theme.logoUrl} alt="Logo" className="w-8 h-8" />
                ) : (
                  <PawIcon className="w-8 h-8 text-primary" />
                )}
              </div>
              <span className="text-2xl font-bold text-primary">
                {organization?.name}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted partner in pet care. Quality products and services for all your furry friends.
            </p>
            <div className="flex items-center gap-3">
              <DogIcon className="text-primary" size={24} />
              <CatIcon className="text-secondary" size={24} />
              <BirdIcon className="text-accent" size={24} />
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Shop Products
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Our Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Acerca de Nosotros
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Pet Care Blog
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Shipping Info
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Returns & Refunds
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Contáctanos
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              {contact?.address && (
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </li>
              )}
              {storeWhatsapp && (
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MessageCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={whatsappUrl(storeWhatsapp)} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {formatPhone(storeWhatsapp)}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              {contact?.facebookUrl && (
                <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {contact?.twitterUrl && (
                <a href={contact.twitterUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-xl bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
              >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {contact?.instagramUrl && (
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-all"
              >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Paw Prints */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} {organization?.name}. All rights reserved. Hecho con{' '}
              <span className="text-primary">❤️</span> for pets.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy">
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </Link>
              <span className="text-border">•</span>
              <Link href="/terms">
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </Link>
            </div>
          </div>

          {/* Decorative paw prints at bottom */}
          <div className="flex items-center justify-center gap-4 mt-4 opacity-20">
            <PawIcon className="w-4 h-4 text-primary" />
            <PawIcon className="w-5 h-5 text-secondary" />
            <PawIcon className="w-4 h-4 text-accent" />
            <PawIcon className="w-5 h-5 text-primary" />
            <PawIcon className="w-4 h-4 text-secondary" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
