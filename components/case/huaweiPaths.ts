/**
 * Phone geometry from the original 2018 Huawei Mate 20 Pro banner
 * (300x600 DCM unit, 600x1200 viewBox). Extracted verbatim from
 * banner.html rather than retyped, so the curves are the ones that
 * shipped.
 *
 * BODY is the filled phone back, the shape the Twilight gradient
 * paints into. OUTER and INNER are the stroke-only outline and the
 * camera cutout, which DrawSVG draws on before the body fades up.
 *
 * Kept in their own module because 1.5KB of path data in the middle
 * of a component makes the component unreadable.
 */
export const PHONE_VIEWBOX = '0 0 600 1200';

export const PHONE_BODY =
  'M59.26,600.46q0-219.23,0-438.46c0-12.72,0-25.47.72-38.16C61.08,106,70.26,93.15,86.36,85.42c10.16-4.89,21.08-6.71,32.25-6.75,28.1-.11,56.2,0,84.29,0q141.75,0,283.49.09c6.48,0,13.21.27,19.4,2,20.62,5.66,31.6,20.73,36.2,40.62a126.3,126.3,0,0,1,3.12,28q.33,150.06.13,300.12,0,312.21-.08,624.42c0,6.85-.19,14-2.1,20.48-5,17.07-18.12,26.35-34.19,31.89A86.86,86.86,0,0,1,480,1131q-137.78-.65-275.54-1c-32-.12-64-.1-96-.68-10.75-.2-20-5.56-28.42-12-14.77-11.35-21-26.83-21-45.14V600.46ZM300.2,188.09H255.6a32.4,32.4,0,0,0-32.23,32.58q0,46.12,0,92.23a43.32,43.32,0,0,0,1,9.37c3.45,15.51,18.22,26.42,35.74,26.2,29.61-.38,59.21-.83,88.81-1.53,12.81-.31,22.56-6.16,27.39-18.38a43.06,43.06,0,0,0,3.22-15q.47-46.68.14-93.36c-.11-16.95-16-32.08-33-32.11Q323.46,188.06,300.2,188.09Z';

export const PHONE_OUTER =
  'M109.62,1129.32c-10.74-.2-20-5.56-28.41-12-14.77-11.35-21-26.83-21-45.14V600.46h.22q0-219.23,0-438.46c0-12.72,0-25.47.73-38.16C62.25,106,71.43,93.15,87.53,85.42c10.16-4.89,21.08-6.71,32.25-6.75,28.1-.11,56.19,0,84.29,0,94.5,0,191,0,285.49.09,6.48,0,13.21.27,19.4,2,20.62,5.66,31.6,20.73,36.2,40.62a126.89,126.89,0,0,1,3.12,28c.21,100-1.87,200.08-1.87,300.12q0,312.21-.08,624.42c0,6.85-.19,14-2.11,20.48-5,17.07-18.11,26.35-34.19,31.89a86.77,86.77,0,0,1-28.88,4.79l-12.46-.06Z';

export const PHONE_INNER =
  'M301.37,188.09H256.76a32.4,32.4,0,0,0-32.22,32.58q-.06,46.12,0,92.23a44,44,0,0,0,1,9.37c3.45,15.51,18.22,26.42,35.74,26.2,29.6-.38,59.21-.83,88.8-1.53,12.81-.31,22.57-6.16,27.39-18.38a43.07,43.07,0,0,0,3.23-15q.46-46.68.14-93.36c-.12-16.95-16-32.08-33-32.11Q324.61,188.06,301.37,188.09Z';

/**
 * The photographic layer.
 *
 * This is the piece the first port missed. In the shipped banner
 * the phone is two stacked paths, not one: this silhouette filled
 * with a pattern holding phone.jpg, and then PHONE_BODY on top
 * carrying the Twilight gradient. PHONE_BODY has the camera module
 * cut out of it, so the lenses, the Leica text and the buttons show
 * through from the photograph underneath while the gradient paints
 * everything around them.
 *
 * Drawing only the gradient path, as the first version did, gives a
 * coloured slab with a hole in it rather than a phone.
 */
export const PHONE_PHOTO =
  'M404.81,1137.48c-23.14,0-44.39,0-67.52-.06-6.57,0-13.25-.12-19.7-.22-6.77-.12-13.77-.23-20.66-.23h-1.11q-41.91.08-83.81.23-44.07.13-88.14.23h-.3c-13.52,0-23.6-1.74-32.66-5.65-18.18-7.83-28.66-22-31.15-42a332.74,332.74,0,0,1-2.42-40.24c-.12-113.57-.15-228-.17-339.72q0-73.11,0-146.21c0-.4,0-.82.07-1.25.17-1.95.38-4.39-3-5.27a9.48,9.48,0,0,1-.44-3.11c-.07-19.81-.11-39.23,0-59a5,5,0,0,1,1.14-2.37,11.24,11.24,0,0,0,1-1.61l.25-.5a7.77,7.77,0,0,0,1-3.17c.09-11.32.07-22.83.05-34,0-2.39-.19-3.16-.77-3.33-3.42-1-3.14-3.23-2.82-5.8a14.67,14.67,0,0,0,.17-2.06c-.13-42.63-.11-85.44-.09-118,0-.49,0-1-.07-1.5-.16-2.21-.3-4.12,2.44-5.31,1-.45,1.09-2.53,1.09-5.2v-.34c0-51.29,0-109.42,0-166.48,0-15.36,1.77-27.8,5.65-39.12,5.92-17.32,16.86-27.89,32.5-31.43a177.64,177.64,0,0,1,38.3-4.71c55-.17,114-.25,180.24-.25,59.95,0,117.9.07,163.33.13,15,0,26.78,2,36.94,6.24,17.19,7.17,27.15,21,30.45,42.25a169.77,169.77,0,0,1,1.91,25.78c.09,128.35.09,258.86.09,385.07v82.36h-.45v82.49q0,96,0,191.92V889c0,50.8,0,103.33-.06,155,0,3.45,0,5.9,0,9.36.08,10,.15,20.41-.53,30.56-1.32,19.33-8.52,33.3-22,42.7-9.49,6.61-20.6,8.69-29.22,9.77a182.56,182.56,0,0,1-21.88,1.06Q438.6,1137.48,404.81,1137.48Z';

/** 600x1200, matching the viewBox exactly. */
export const PHONE_PHOTO_SRC = '/images/huawei/phone.jpg';

/**
 * The device silhouette used to mask the finish photography.
 *
 * This is the piece the takeover was missing. The shipped portfolio
 * does not place the JPEGs as images; it loads them into an SVG
 * <pattern> and fills this path with that pattern, so the photo is
 * clipped to the phone outline. Xavi's own note on the technique:
 * "Making use of SVG's masking properties, I was able to use
 * optimized jpg images as transparent."
 *
 * Drop the mask and every finish arrives in its 400x840 bounding
 * box, which on a coloured slot reads as a white rectangle around
 * the phone.
 *
 * Coordinates are in the 400x840 space of the back photography, so
 * the mask and the images line up one to one with no scaling.
 */
export const PHONE_BACK_VIEWBOX = '0 0 400 840';

export const PHONE_BACK_MASK =
  'M9.52,309.19c0-2,.21-3.55,2.87-3.11V272.84c-2.4.27-2.87-1-2.87-3q.08-46.68,0-93.36c0-2,.21-3.55,3-3.09v-2.64c0-36.74,0-69.56,0-106.3,0-5.26.08-10.53.44-15.77.75-10.87,4.83-20.21,13.54-27.11,3.9-3.08,8.12-5.81,13.28-6.14,5.88-.37,11.77-.68,17.66-.68l142.57,0q69,0,137.91,0c7.58,0,15.17.19,22.75.41a17.33,17.33,0,0,1,5.55.93c10.57,4,17.82,11.35,21.34,22.12,2.67,8.15,2.92,16.64,2.92,25.13,0,235.24,0,466.56,0,701.81,0,9.11-.38,18.23-.79,27.34-.38,8.77-3.15,16.74-9,23.42-4.46,5.1-9.81,9.24-16.64,10.22a126.62,126.62,0,0,1-17.86.91Q273.1,827,200,827L56.65,827q-6.85,0-13.69-.46a26.14,26.14,0,0,1-7.61-1.25A33.29,33.29,0,0,1,17.2,809c-3.7-7.14-4.7-14.87-4.7-22.78q0-215.35,0-430.72v-3c-2.4.27-3-.8-3-2.84Q9.61,329.42,9.52,309.19Z';

/**
 * The front silhouette, same 400x840 space as the back.
 *
 * Used for the second phone in the masthead, so the billboard shows
 * a front and a back at an angle the way the hero and the shipped
 * takeover do, rather than one lonely phone.
 */
export const PHONE_FRONT_MASK =
  'M390.48,309.19c0-2-.21-3.55-2.87-3.11V272.84c2.4.27,2.87-1,2.87-3q-.08-46.68,0-93.36c0-2-.21-3.55-3-3.09v-2.64c0-36.74,0-69.56,0-106.3,0-5.26-.08-10.53-.44-15.77-.75-10.87-4.83-20.21-13.54-27.11-3.9-3.08-8.12-5.81-13.28-6.14-5.88-.37-11.77-.68-17.66-.68L200,14.68q-69,0-137.91,0c-7.58,0-15.17.19-22.75.41a17.33,17.33,0,0,0-5.55.93C23.22,20,16,27.38,12.45,38.15,9.78,46.3,9.53,54.79,9.53,63.28c0,235.24,0,466.56,0,701.81,0,9.11.38,18.23.79,27.34.38,8.77,3.15,16.74,9,23.42,4.46,5.1,9.81,9.24,16.64,10.22a126.62,126.62,0,0,0,17.86.91q73.08,0,146.18,0l143.35,0q6.86,0,13.69-.46a26.14,26.14,0,0,0,7.61-1.25A33.29,33.29,0,0,0,382.8,809c3.7-7.14,4.7-14.87,4.7-22.78q0-215.35,0-430.72v-3c2.4.27,3-.8,3-2.84Q390.39,329.42,390.48,309.19Z';
