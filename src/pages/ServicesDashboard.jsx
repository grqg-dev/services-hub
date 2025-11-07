import { Link } from 'react-router-dom';
import { FileText, Hospital, ClipboardList, FileSignature, MessageSquare } from 'lucide-react';

function ServicesDashboard() {
  const services = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Fax Viewer',
      description: 'View, organize, and manage incoming fax documents. Access patient communications and medical records received via fax.',
      href: 'https://main.d25tq08gcahgrq.amplifyapp.com/',
      external: true
    },
    {
      icon: <Hospital className="w-8 h-8" />,
      title: 'Document Generator',
      description: 'Generate comprehensive referral letters for MFM, LAMB PT, and other specialties. Create professional referrals with patient details and clinical information.',
      href: 'https://main.d1wbkxgxvn1fyc.amplifyapp.com/',
      external: true
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: 'Records Request',
      description: 'Medical records request and release forms. Manage patient data requests and HIPAA-compliant record sharing.',
      href: '/records',
      external: false
    },
    {
      icon: <FileSignature className="w-8 h-8" />,
      title: 'RabbitSign',
      description: 'Digital patient payment agreements and consent forms. Streamline the agreement process with secure electronic signatures.',
      href: 'https://main.d8jkp2ztt9ebz.amplifyapp.com/',
      external: true
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Patient Communications',
      description: 'Patient communication history and summaries. Track interactions, review patient notes, and manage communication records.',
      href: 'https://main.d2vyg46rnxg2kp.amplifyapp.com/',
      external: true
    }
  ];

  const ServiceCard = ({ service }) => {
    const cardContent = (
      <>
        <div className="w-15 h-15 bg-gradient-to-br from-[#F8CDB0] to-[#F5B895] rounded-xl flex items-center justify-center text-white mb-4 shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
          {service.icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-[#2c3e50] transition-colors duration-300 group-hover:text-[#D49A6F]">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed md:block hidden">
          {service.description}
        </p>
      </>
    );

    if (service.external) {
      return (
        <a
          href={service.href}
          className="bg-white rounded-2xl p-6 no-underline text-inherit block transition-all duration-300 shadow-sm border border-gray-100 relative group hover:-translate-y-1 hover:shadow-lg hover:border-[rgba(245,184,149,0.3)] focus:outline-2 focus:outline-[#F5B895] focus:outline-offset-2"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F8CDB0] to-[#F5B895] rounded-t-2xl transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
          {cardContent}
        </a>
      );
    }

    return (
      <Link
        to={service.href}
        className="bg-white rounded-2xl p-6 no-underline text-inherit block transition-all duration-300 shadow-sm border border-gray-100 relative group hover:-translate-y-1 hover:shadow-lg hover:border-[rgba(245,184,149,0.3)] focus:outline-2 focus:outline-[#F5B895] focus:outline-offset-2"
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F8CDB0] to-[#F5B895] rounded-t-2xl transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
        {cardContent}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <header className="bg-gradient-to-r from-[#F8CDB0] to-[#F5B895] py-5 px-4 text-center shadow-md relative overflow-hidden">
        <h1 className="text-3xl font-semibold text-white drop-shadow-sm mb-1 relative z-10">
          Dr. Ray Practice Services
        </h1>
        <p className="text-base text-white/95 font-medium relative z-10">
          Clinical and administrative tools
        </p>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default ServicesDashboard;

