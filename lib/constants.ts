import { InquiryStatus } from "@/types/inquiry";

export const AMX_BRAND = {
  fullName: "Arba Minch Experiences",
  shortName: "AMX",
  tagline: "One clear itinerary. Verified local providers. One responsible coordinator. Local support during your trip.",
  positioningStatement:
    "AMX connects visitors with verified local tourism providers and organizes clear, reliable Arba Minch experiences.",
  heroHeadline: "Explore Arba Minch with trusted local guides.",
  heroSubheadline: "One clear itinerary. Verified local providers. Local support during your trip.",
  slaNotice: "Response within 30 minutes during working hours.",
  whatsappNumber: "+251911000000",
  whatsappDisplay: "+251 911 000 000",
  workingHours: "Daily: 07:00 AM – 08:00 PM EAT",
  location: "Arba Minch, Gamo Zone, Southern Ethiopia",
};

export const TRUST_SIGNALS = [
  {
    title: "Verified local providers",
    description: "Every guide, driver, and boat operator is directly verified by AMX.",
  },
  {
    title: "Clear prices",
    description: "Itemized breakdowns in ETB with zero surprise hidden charges.",
  },
  {
    title: "One responsible coordinator",
    description: "Single point of contact from your initial inquiry to departure.",
  },
  {
    title: "Local support during the trip",
    description: "Direct local phone and WhatsApp assistance on the ground.",
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Choose an experience",
    description: "Explore our packages or request a custom itinerary for Arba Minch.",
  },
  {
    step: 2,
    title: "Send your request",
    description: "Tell us your dates, group size, and requirements without upfront payment.",
  },
  {
    step: 3,
    title: "Receive a clear quotation",
    description: "We check provider availability and send an itemized quotation in ETB.",
  },
  {
    step: 4,
    title: "Confirm and travel",
    description: "Accept the itinerary and travel with your designated local coordinator.",
  },
];

export const WHY_AMX_POINTS = [
  {
    feature: "Availability check",
    directory: "You must message 5 different strangers manually",
    amx: "AMX confirms availability with verified providers directly",
  },
  {
    feature: "Pricing transparency",
    directory: "Unclear rates that change upon arrival",
    amx: "One clear, written itemized quotation in ETB",
  },
  {
    feature: "Provider reliability",
    directory: "No inspection or verification process",
    amx: "All guides, drivers, and boat operators are personally checked",
  },
  {
    feature: "Trip coordination",
    directory: "You handle delays and disputes alone",
    amx: "One responsible AMX coordinator manages the schedule",
  },
  {
    feature: "Written itinerary",
    directory: "Vague verbal agreements",
    amx: "Structured timeline with clear inclusions and exclusions",
  },
];

/**
 * 7 Color-coded status mappings matching prompt specifications:
 * Gray: New | Blue: Contacted | Yellow: Awaiting provider
 * Purple: Quotation sent | Green: Confirmed | Red: Cancelled | Dark green: Completed
 */
export const STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  new: {
    label: "New",
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-300",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-blue-50",
    text: "text-secondary-700",
    border: "border-secondary-200",
  },
  awaiting_provider: {
    label: "Awaiting Provider",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-300",
  },
  quotation_sent: {
    label: "Quotation Sent",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-300",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
  },
  completed: {
    label: "Completed",
    bg: "bg-primary-50",
    text: "text-primary-800",
    border: "border-primary-300",
  },
};