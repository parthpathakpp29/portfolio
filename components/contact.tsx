"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { sendEmail } from "@/actions/sendEmail";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";

export default function Contact() {
  const { ref } = useSectionInView("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center relative z-20 px-4 sm:px-0"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Contact Me
          </span>
        </h2>
      </div>

      <p className="text-gray-300 -mt-4 sm:-mt-6 text-sm sm:text-base max-w-[90%] mx-auto">
        Please contact me directly at{" "}
        <a 
          className="underline font-medium text-purple-400 hover:text-purple-300 transition-colors break-all sm:break-normal" 
          href="mailto:parthpathakpp1@gmail.com"
        >
          parthpathakpp1@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form
        className="mt-8 sm:mt-10 flex flex-col"
        action={async (formData) => {
          const { error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
      >
        {/* Glass Input Field */}
        <input
          className="h-12 sm:h-14 px-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-sm focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all text-sm sm:text-base"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        
        {/* Glass Textarea */}
        <textarea
          className="h-40 sm:h-52 my-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/50 backdrop-blur-sm focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all p-4 text-sm sm:text-base"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        
        {/* Submit Button Container */}
        <div className="flex justify-center mt-2">
          <SubmitBtn />
        </div>
      </form>
    </motion.section>
  );
}