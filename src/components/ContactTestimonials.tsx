import { MicroTestimonial } from "@/components/MicroTestimonial";

export function ContactTestimonials() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <MicroTestimonial
        quote="We submitted the form and got a full plan the next morning. Clearer than anything our DJ offered in 3 weeks."
        author="Sandra & Leo"
        venue="Cochrane"
      />
      <MicroTestimonial
        quote="The ceremony plan let us skip a site visit. Parker mapped everything — even seating placement."
        author="Rachel"
        venue="Calgary"
      />
    </div>
  );
}
