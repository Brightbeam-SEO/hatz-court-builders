import { writeFileSync } from "node:fs";
import path from "node:path";

const FAQ = "\n\n<!--SOL_BOISE_FAQ-->";

function intro(introText, cta) {
  return `${introText}\n\n${cta}\n\n`;
}

const pages = {
  facial: `${intro(
    "Indulge in our professional facial services designed to rejuvenate your skin and boost your confidence. At Zen Day Spa, our facial treatments are crafted to address a variety of skin concerns—from hydration and anti-aging to deep cleansing and soothing sensitive skin.\n\nOur expert estheticians use high-quality products and proven techniques to help reveal a luminous complexion.",
    "Call now to schedule your personalized facial experience — **(208) 927-3160**.",
  )}<h2 id="what-we-offer">What Our Facial Spa Offers</h2>

- **[Contact Us](/contact-us/)**
- Deep cleansing to remove impurities
- Exfoliation that promotes cell renewal
- Targeted treatments to reduce fine lines and wrinkles
- Hydration and nourishment for a healthy glow
- Customized solutions for your specific skin type

<h2 id="signature-treatments">Our Signature Facial Treatments</h2>

Our facial spa provides a range of facial options tailored to your unique needs. Each facial is performed with precision and care in a calming, inviting environment.

<h3 id="classic-facial">Classic Facial</h3>

This treatment focuses on thorough cleansing, gentle exfoliation, and a nourishing mask to leave your skin feeling soft and refreshed. It's the perfect choice for maintaining a clear, vibrant complexion.

<h3 id="anti-aging-facial">Anti-Aging Facial</h3>

Using advanced techniques and specially formulated products, our anti-aging facial targets fine lines, wrinkles, and sagging skin. The goal is to stimulate collagen production and enhance your skin's natural elasticity, so you leave with a visibly younger appearance.

<h3 id="hydrating-facial">Hydrating Facial</h3>

Ideal for dry or dehydrated skin, this facial replenishes moisture and restores balance. Our hydrating facial uses products rich in antioxidants and vitamins to soothe irritation while locking in essential hydration for lasting comfort.

Call now to schedule your personalized facial experience — **(208) 927-3160**.

<h2 id="benefits">Benefits of Our Facial Services</h2>

- **Improved Skin Texture:** Regular facials help smooth your skin, minimizing the appearance of pores and imperfections.
- **Enhanced Radiance:** A thorough facial treatment can revitalize dull skin, leaving you with a natural glow.
- **Relaxation and Stress Relief:** Enjoy the calming effects of a facial massage that reduces tension and promotes overall well-being.
- **Customized Skincare:** Every treatment is tailored to your skin type, so you receive the optimal balance of cleansing, hydration, and nourishment.

<h2 id="experience">The Facial Experience at Zen Day Spa</h2>

When you book a facial at our spa, you are treated to an experience that combines relaxation with effective skin care. Our serene treatment room, soothing music, and gentle lighting set the stage for a truly pampering session. We begin with a personalized consultation to understand your skin concerns and goals. Then, our experienced estheticians customize your treatment, so that every step—from cleansing and exfoliation to massage and mask application—is perfectly aligned with your needs.

<h3 id="quality">A Quality Facial Spa Experience</h3>

At Zen Day Spa, quality and customer satisfaction are our top priorities. Our facial spa services are delivered by skilled professionals who stay current with the latest skincare trends and techniques. We use premium, dermatologist-approved products that are gentle yet effective, so your skin receives the best care possible.

<h3 id="expert-techniques">Expert Techniques and Personalization</h3>

- **Customized Consultation:** Every facial begins with a one-on-one consultation to assess your skin's needs and customize the treatment accordingly.
- **Innovative Methods:** We blend traditional techniques with modern innovations to offer facial services that are both effective and indulgent.
- **Relaxing Environment:** Our spa is designed to be a sanctuary where you can unwind, recharge, and enjoy a holistic skincare experience.
- **Ongoing Support:** Post-treatment care is an essential part of our service. We offer personalized recommendations to help you maintain the benefits of your facial at home.

Call now to schedule your personalized facial experience — **(208) 927-3160**.

<h3 id="booking">Simple Booking Process</h3>

Booking your facial appointment is easy. Just give us a call, and our friendly team will help you schedule a time that fits your busy lifestyle. We pride ourselves on offering a seamless service experience, making sure that your journey to radiant skin begins with ease and comfort.

<h2 id="enhance-skin">Enhance Your Skin Health With A Facial Today</h2>

If you're looking for facial services that deliver real results, look no further than Zen Day Spa. Our comprehensive facial treatments, offered in a luxurious yet welcoming setting, provide a blend of relaxation and effective skin care that transforms your complexion. Whether you choose a classic facial, an anti-aging facial, or a hydrating treatment, you'll experience a level of care that's second to none.

<h2 id="discover">Discover the Difference</h2>

Elevate your skincare routine with a facial at **[Zen Day Spa – Massage, Scalp, and Reflexology](/)**. Our tailored approach and commitment to excellence mean you can trust us to deliver a treatment that not only beautifies your skin but also relaxes your body and mind. Treat yourself to the ultimate facial experience and see why our clients keep coming back.

Call us today to schedule your appointment and discover the transformative power of our facial services. Embrace the beauty of healthy, glowing skin at Zen Day Spa—your destination for exceptional facial spa treatments in Eagle, Idaho.

Learn more about our massage spa services: [scalp massage](/services/scalp-massage/), [foot massage](/services/foot-massage-reflexology/), facial, [body massage](/services/body-massage/), and [pregnancy massage](/services/pregnancy-massage/).

Call now to schedule your personalized facial experience — **(208) 927-3160**.${FAQ}`,

  microneedling: `${intro(
    "Microneedling is a minimally invasive cosmetic treatment designed to rejuvenate the skin, reducing signs of aging, scars, and imperfections. At Zen Day Spa in Eagle, Idaho, our microneedling treatments help stimulate your skin's natural healing process, resulting in smoother texture, improved tone, and a revitalized appearance.",
    "Call now to schedule your microneedling appointment — **(208) 927-3160**.",
  )}<h2 id="what-is">Microneedling: What is it?</h2>

Microneedling involves the use of tiny, sterile needles that gently create microscopic channels in the skin. This controlled injury triggers your skin's natural healing response, stimulating the production of collagen and elastin—essential proteins that maintain healthy, youthful skin. Over time, this process significantly improves skin texture, reduces fine lines and wrinkles, and diminishes acne scars and pigmentation issues.

<h2 id="benefits">Benefits of Microneedling</h2>

- **[Contact Us](/contact-us/)**
- **Enhanced Skin Texture:** Smooths out uneven texture and minimizes pore size.
- **Reduced Signs of Aging:** Diminishes fine lines, wrinkles, and improves skin elasticity.
- **Scar Reduction:** Significantly reduces acne scars, stretch marks, and other imperfections.
- **Even Skin Tone:** Helps fade hyperpigmentation, sunspots, and age-related discoloration.
- **Improved Product Absorption:** Enhances the effectiveness of skincare products by allowing deeper penetration.

Call now to schedule your microneedling appointment — **(208) 927-3160**.

<h2 id="experience">The Microneedling Experience at Zen Day Spa</h2>

Your microneedling session at **[Zen Day Spa](/)** begins with a detailed skin assessment and consultation. Our experienced skincare professionals discuss your goals, answer any questions, and tailor your treatment plan specifically for your skin type and concerns.

During treatment, a specialized device with ultra-fine needles is gently moved across your skin, creating controlled micro-injuries. The procedure is comfortable, with minimal downtime. Following your session, you may experience mild redness or sensitivity, which typically subsides within a day or two.

Most clients notice visible improvement within days, with optimal results emerging after a series of sessions.

Call now to schedule your microneedling appointment — **(208) 927-3160**.

<h2 id="aftercare">Aftercare and Results</h2>

Proper aftercare maximizes the benefits of your microneedling treatment. Our skincare specialists will provide guidance on post-procedure skincare, including gentle cleansing and moisturizing, as well as sun protection. Regular treatments spaced several weeks apart are recommended for optimal skin rejuvenation and long-lasting results.

<h2 id="why-zen">Why Choose Zen Day Spa for Microneedling?</h2>

- **Experienced Professionals:** Highly skilled aestheticians trained in advanced skincare techniques.
- **Customized Approach:** Every treatment is personalized to target your specific skin concerns.
- **Relaxing Atmosphere:** Enjoy a soothing, spa environment designed for comfort and relaxation.
- **Local Accessibility:** Proudly serving clients from Eagle, Boise, Meridian, Nampa, and Star.

Ready to experience younger, healthier-looking skin? **[Contact us](/contact-us/)** today to schedule your microneedling appointment.

Call now to schedule your microneedling appointment — **(208) 927-3160**.${FAQ}`,
};

const outDir = path.join(process.cwd(), "content", "blog");
for (const [slug, body] of Object.entries(pages)) {
  const file = path.join(outDir, `${slug}-body.md`);
  writeFileSync(file, body, "utf8");
  console.log("wrote", file);
}
