/**
 * Long-form service page copy — process-focused, no invented prices/turnaround
 */

export type ServiceLongCopy = {
  process: string[];
  consideringCost: string;
  timing: string;
  parts: string;
};

export const SERVICE_LONG_COPY: Record<string, ServiceLongCopy> = {
  'panel-beating': {
    process: [
      'Panel beating at Gwecely starts with a physical inspection of the damaged area — doors, wings, bonnet, boot, roof, or quarter panels — so we can see whether the metal can be reshaped or needs replacement.',
      'We document the damage, discuss the repair approach with you, and prepare an estimate. If the job is linked to an insurance claim, we support the estimate and documentation your assessor needs; approval of the claim remains with the insurer.',
      'On the bench or on the vehicle, technicians straighten and reshape panels, repair mounting points where required, and prepare surfaces so paint will adhere correctly. Structural concerns are flagged early rather than painted over.',
      'After bodywork, the vehicle moves into paint preparation (masking, primer, flatting) when spray painting is part of the same job. You are invited to review progress before final finishing where practical.',
      'Handover includes a walk-through of the repaired areas. Keep your paperwork and photos for your own records and for any insurer follow-up.',
    ],
    consideringCost:
      'Cost depends on how many panels are affected, whether panels can be repaired or must be replaced, and whether paint and mechanical checks are included. TODO: confirm typical price ranges or “from” figures the owner is willing to publish — do not invent KES amounts.',
    timing:
      'Turnaround depends on parts availability, paint booth scheduling, and whether other mechanical work is needed. TODO: confirm realistic average days for light dent work vs multi-panel collision repairs.',
    parts:
      'Where panels or clips must be replaced, we discuss genuine versus quality aftermarket options with you (and with the insurer when applicable) before ordering. Consumables such as filler, primer and abrasives are workshop-supplied as part of the bodywork process.',
  },
  'spray-painting': {
    process: [
      'Spray painting begins with colour identification and surface assessment — whether you need a full panel respray, a blend into adjacent panels, or a full vehicle refinish.',
      'We mask surrounding areas, remove or protect trim as needed, and prepare the metal or existing finish so the new paint system bonds correctly.',
      'Primer, base colour and clear coat are applied in controlled stages. Colour matching aims to blend with your existing finish; older or faded paint may need a wider blend for a clean result.',
      'After curing, we flatting and polishing where required, refit trim, and check for dust nibs or imperfections before handover.',
      'If painting follows panel beating or accident repair, the jobs are sequenced so bodywork is complete before final colour coats.',
    ],
    consideringCost:
      'Paint cost varies with the number of panels, colour type (solid, metallic, pearl), and whether blending or a full respray is required. TODO: owner to supply publishable guidance ranges if desired.',
    timing:
      'Booth time and curing add days beyond bodywork alone. TODO: confirm typical turnaround bands the workshop can honestly quote.',
    parts:
      'We use automotive refinish materials suited to the job. OEM or colour-coded paint codes help matching; bring any paint code from the door jamb if available.',
  },
  'accident-repairs': {
    process: [
      'Accident repair is coordinated end-to-end: intake and photos, damage assessment, estimate, bodywork, paint, and mechanical safety checks where the collision affected running gear or lights.',
      'Send clear photos on WhatsApp when you can — multiple angles of the damage, the whole vehicle, and the number plate help us triage before you arrive.',
      'We prepare documentation useful for insurance assessments. We do not approve claims; your insurer and assessor decide authorised work and values.',
      'Repairs may combine panel beating, panel replacement, spray painting, alignment-related checks, and replacement of damaged lights or bumper assemblies.',
      'Before you drive away we review completed work with you. Keep copies of estimates and invoices for your claim file.',
    ],
    consideringCost:
      'Collision jobs vary widely — a bumper and wing differ from structural rail work. Estimates follow inspection. TODO: optional owner-approved example ranges for common light collisions only.',
    timing:
      'Multi-trade accident jobs take longer than a single-panel cosmetic repair. Parts lead times often dominate the schedule. TODO: confirm average workshop days for common categories if known.',
    parts:
      'Safety-related parts (airbags, seatbelts, structural members) must meet appropriate standards. We discuss options with you and your insurer’s requirements when a claim is involved.',
  },
  'vehicle-servicing': {
    process: [
      'Servicing follows a checklist suited to your vehicle type and interval — oil and filter changes, fluid levels, filters, belts where visible, lights, and a multi-point inspection.',
      'Tell us the mileage, any warning lights, and recent symptoms. Bring service history if you have it.',
      'We carry out agreed work, note findings that need attention later, and record what was done for your files.',
      'Fleet customers can discuss scheduled slots so multiple vehicles are not off the road at once.',
      'After service we explain any recommended follow-up repairs separately so you can approve costs before extra work starts.',
    ],
    consideringCost:
      'Service cost depends on vehicle size, oil specification, and filter set. TODO: publish package prices only if the owner confirms them.',
    timing:
      'Many routine services are same-day when booked; complex findings may need a return visit. TODO: confirm booking lead times.',
    parts:
      'Oils, filters and consumables are selected to suit the vehicle. Ask if you prefer a specific brand already used in your fleet.',
  },
  'mechanical-repairs': {
    process: [
      'Mechanical work starts with listening to the fault, a road test where safe, and diagnostics — including ECU scanning when the symptom points to electronic or engine management issues.',
      'We isolate the system involved (brakes, suspension, engine, gearbox, cooling, electrical) and quote the repair before major strip-downs where possible.',
      'Repairs are carried out with attention to related wear items that would cause a comeback if left untouched — always discussed with you first.',
      'After repair we verify the fault is cleared and explain any driving or bedding-in notes (for example new brake pads).',
      'Accident vehicles sometimes need mechanical checks after bodywork; we coordinate that within the same workshop where booked.',
    ],
    consideringCost:
      'Mechanical quotes depend on diagnosis. Diagnostic time may be charged separately from parts and labour. TODO: owner policy on diagnostic fees if publishable.',
    timing:
      'Simple brake or suspension jobs differ from engine or gearbox work. Parts availability drives timing. TODO: confirm typical ranges if known.',
    parts:
      'We discuss genuine versus aftermarket parts based on the vehicle’s age, use, and your preference. Critical safety parts are called out clearly on the estimate.',
  },
  'fleet-maintenance': {
    process: [
      'Fleet maintenance is planned around your operating calendar — inspections, services, and repairs scheduled so vehicles return to work with clear paperwork.',
      'We can work from a contact person in your organisation for approvals, collection, and WhatsApp photo updates on longer jobs.',
      'Common fleet work includes servicing, brakes, tyres coordination (via parts supply), accident bodywork, and mechanical repairs on commercial or staff vehicles.',
      'Records of work done help your compliance and cost tracking. Ask for invoice detail in the format your accounts team needs.',
      'Priority scheduling for fleets is arranged by agreement — contact the workshop to discuss volume and typical vehicle types.',
    ],
    consideringCost:
      'Fleet pricing is usually agreed per job or under a simple working arrangement — not a one-size public tariff. TODO: owner to confirm whether any fleet rate sheet can be mentioned.',
    timing:
      'Turnaround targets can be agreed for routine services; collision repairs follow parts and paint capacity. TODO: confirm any SLA wording only if real.',
    parts:
      'Bulk or repeat parts needs can be planned with our parts counter. Keep preferred brands and tyre sizes on file with us for faster turnaround.',
  },
};
