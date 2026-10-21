"use client";

import React, { useState } from "react";
import { MapPin, Phone, Search, Navigation, CheckCircle2, Store } from "lucide-react";

export const DealerLocator: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [pincodeQuery, setPincodeQuery] = useState("");

  const dealers = [
    {
      name: "Gupta Paints & Hardware Mart",
      city: "delhi",
      cityName: "Delhi NCR",
      area: "Pitampura, North West Delhi",
      address: "Plot 42, Main Road, Rani Bagh Market, Pitampura, New Delhi - 110034",
      phone: "+91 98765 43210",
      services: ["Automatic Tinting Machine", "Digital Fan Deck", "Same-Day Delivery"],
      badge: "Master Platinum Stockist",
    },
    {
      name: "Rajasthan Colour Galleria",
      city: "jaipur",
      cityName: "Jaipur",
      area: "Mansarovar, Jaipur",
      address: "Shop 12-14, VT Road Commercial Complex, Mansarovar, Jaipur - 302020",
      phone: "+91 98290 12345",
      services: ["Exterior Expert", "Computerised Shade Matching", "On-site Contractor Support"],
      badge: "Authorized Gold Dealer",
    },
    {
      name: "Awadh Paint & Sanitary Emporium",
      city: "lucknow",
      cityName: "Lucknow",
      area: "Gomti Nagar, Lucknow",
      address: "B-2/19, Vipul Khand, Gomti Nagar, Lucknow - 226010",
      phone: "+91 94150 98765",
      services: ["Waterproofing Specialist", "Full 9-Bucket Inventory", "Credit Facilities"],
      badge: "Master Dealer",
    },
    {
      name: "Shree Balaji Hardware & Paints",
      city: "chandigarh",
      cityName: "Chandigarh / Mohali",
      area: "Phase 7, Industrial Area, Mohali",
      address: "SCO 88, Sector 61, Mohali, Punjab - 160062",
      phone: "+91 98140 55432",
      services: ["Architectural Billing", "Contractor Bulk Supply", "Color Visualizer Kiosk"],
      badge: "Diamond Partner",
    },
    {
      name: "Maharashtra Colour Concepts",
      city: "mumbai",
      cityName: "Mumbai",
      area: "Andheri East, Mumbai",
      address: "G-4, Western Express Highway Trade Centre, Andheri East, Mumbai - 400069",
      phone: "+91 98200 44321",
      services: ["Coastal Waterproofing", "Express Site Visit", "Tinting Station"],
      badge: "Gold Stockist",
    },
    {
      name: "Malwa Paint Corporation",
      city: "indore",
      cityName: "Indore",
      area: "Vijay Nagar, Indore",
      address: "14/2, AB Road, Scheme 54, Vijay Nagar, Indore - 452010",
      phone: "+91 98930 67890",
      services: ["Diwali Scheme Hub", "Computer Tinting", "Wall Putty Wholesale"],
      badge: "Platinum Partner",
    },
  ];

  const filteredDealers = dealers.filter((d) => {
    const matchesCity = selectedCity === "all" || d.city === selectedCity;
    const matchesPincode =
      !pincodeQuery ||
      d.address.toLowerCase().includes(pincodeQuery.toLowerCase()) ||
      d.cityName.toLowerCase().includes(pincodeQuery.toLowerCase());
    return matchesCity && matchesPincode;
  });

  return (
    <section id="dealer-locator" className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Indigo Style) */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#004B87] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Retail Stockist Network</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find an Authorized <span className="text-[#004B87]">Ankur Paints Dealer</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Connect with 1,200+ certified retail stores across India. Experience live computerised tinting, instant barcode billing, and expert on-site advice.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md max-w-3xl mx-auto mb-12 flex flex-col sm:flex-row gap-3">
          <div className="sm:w-1/2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 outline-none focus:border-[#004B87] cursor-pointer"
            >
              <option value="all">All Indian Cities & Regions (6)</option>
              <option value="delhi">Delhi NCR</option>
              <option value="jaipur">Jaipur (Rajasthan)</option>
              <option value="lucknow">Lucknow (Uttar Pradesh)</option>
              <option value="chandigarh">Chandigarh / Mohali (Punjab)</option>
              <option value="mumbai">Mumbai (Maharashtra)</option>
              <option value="indore">Indore (Madhya Pradesh)</option>
            </select>
          </div>

          <div className="sm:w-1/2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={pincodeQuery}
              onChange={(e) => setPincodeQuery(e.target.value)}
              placeholder="Enter Pincode or Locality (e.g. 110034)"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#004B87]"
            />
          </div>
        </div>

        {/* Dealer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDealers.map((d, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-blue-50 text-[#004B87] border border-blue-100">
                    {d.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{d.cityName}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#004B87] transition-colors leading-tight">
                    {d.name}
                  </h3>
                  <p className="text-xs text-slate-500 flex items-start gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{d.address}</span>
                  </p>
                </div>

                {/* Services Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {d.services.map((svc, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600"
                    >
                      ✓ {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${d.phone}`}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-[#004B87] hover:text-white text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Store</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(d.name + " " + d.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#E8501E] hover:bg-[#D04212] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
