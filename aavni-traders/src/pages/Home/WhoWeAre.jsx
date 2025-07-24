import { motion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WhoWeAre = () => {
  const navigate = useNavigate();

  // Static dummy data
  const sectionData = {
    section_header: "Our Gifting Legacy",
    text_content: `
      <p>Founded in 2010, CorpGiftGPT has established itself as a premier corporate gifting solutions provider. 
      We specialize in creating meaningful connections through thoughtfully curated gifts that reflect your brand's values.</p>
      <p class="mt-4">Our team of gifting experts combines creativity with strategic thinking to deliver 
      memorable experiences that strengthen business relationships and leave lasting impressions.</p>
    `,
    years_experience: "12+",
    clients_served: "850+",
    section_image: "corporate-gifting-team.jpg", // This would be your local image
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F9F5F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#780A0A] mb-4">
            {sectionData.section_header}
          </h2>
          <div className="w-20 h-1 bg-[#DEAF29] mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div
              className="text-lg text-[#5e0808] mb-6 text-ellipsis leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sectionData.text_content }}
            />

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e8d9b5]">
                <h4 className="font-bold text-[#780A0A] flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-[#DEAF29]" />
                  {sectionData.years_experience} Years
                </h4>
                <p className="text-sm text-gray-600">In Corporate Gifting</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-[#e8d9b5]">
                <h4 className="font-bold text-[#780A0A]">
                  {sectionData.clients_served} Clients
                </h4>
                <p className="text-sm text-gray-600">Trusted Partnerships</p>
              </div>
            </div>

            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <button
                onClick={() => navigate("/aboutus")}
                className="inline-flex items-center text-[#780A0A] hover:text-[#5e0808] font-medium group transition-colors cursor-pointer"
              >
                Discover Our Story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* Image/Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#DEAF29]/10 to-[#780A0A]/70"></div>
            <img
              src="/images/corporate-gifting-team.jpg" // Local image path
              alt="CorpGiftGPT team curating corporate gifts"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/images/placeholder-gift.jpg";
                e.target.alt = "Corporate gift selection";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
