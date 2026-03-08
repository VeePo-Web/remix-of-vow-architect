import { MicroTestimonial } from "@/components/MicroTestimonial";

export function ContactTestimonials() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <MicroTestimonial
        quote="I sent my details and received a full plan the next morning — clearer than anything our previous musician offered in three weeks."
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
