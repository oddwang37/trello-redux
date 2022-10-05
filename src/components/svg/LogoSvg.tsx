import * as React from "react"
import { SVGProps } from "react"

const LogoSvg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={85}
    height={64}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#000"
      d="M10.898 0h13.125v20.046H10.898zM44.307 0h15.511v20.046H44.307zM62.205 0H75.33v25.773H62.205zM26.409 0H41.92v14.318H26.409z"
    />
    <path
      d="M12.09 2.864h10.74v4.295H12.09V2.864ZM45.5 2.864h13.125v4.295H45.5V2.864ZM63.398 2.864h10.738v4.295H63.398V2.864ZM27.602 2.864h13.125v4.295H27.602V2.864ZM27.602 8.59h13.125v4.296H27.602V8.591ZM12.091 8.591H22.83v4.295H12.091zM12.091 14.318H22.83v4.295H12.091zM45.5 8.591h13.125v4.295H45.5zM63.398 8.591h10.739v4.295H63.398zM45.5 14.318h13.125v4.295H45.5zM63.398 14.318h10.739v4.295H63.398zM63.398 20.045h10.739v4.295H63.398zM9.98 33.4v2.16H6.42V46H3.68V35.56H.2V33.4h9.78ZM11.576 46v-9.54h2.66V46h-2.66Zm1.34-11.58c-.453 0-.806-.127-1.06-.38a1.37 1.37 0 0 1-.38-.98c0-.387.127-.707.38-.96.254-.267.607-.4 1.06-.4.44 0 .787.133 1.04.4.267.253.4.573.4.96s-.126.713-.38.98c-.253.253-.606.38-1.06.38Zm8.468 11.8c-.347 0-.694-.047-1.04-.14a3.072 3.072 0 0 1-.84-.32v4.84h-2.64V36.42h2.02l.28 1.06a4.4 4.4 0 0 1 1.32-.88 3.93 3.93 0 0 1 1.66-.34c1.253 0 2.24.427 2.96 1.28.733.84 1.1 2.007 1.1 3.5 0 .84-.127 1.587-.38 2.24-.254.64-.6 1.18-1.04 1.62-.44.44-.954.773-1.54 1a5.401 5.401 0 0 1-1.86.32Zm.04-7.96c-.44 0-.827.107-1.16.32-.334.2-.587.407-.76.62v4.56c.413.333.926.5 1.54.5.293 0 .58-.053.86-.16.293-.12.553-.3.78-.54.24-.253.426-.58.56-.98.146-.4.22-.887.22-1.46a4.38 4.38 0 0 0-.14-1.14 2.62 2.62 0 0 0-.38-.9 1.96 1.96 0 0 0-.64-.6 1.724 1.724 0 0 0-.88-.22Zm6.811-.96a7.513 7.513 0 0 1 1.82-.76 7.25 7.25 0 0 1 2.04-.28c.573 0 1.093.067 1.56.2.48.133.887.347 1.22.64.347.28.607.647.78 1.1.187.44.28.973.28 1.6V46h-2.06l-.24-.98h-.08c-.307.373-.7.667-1.18.88-.467.213-1.013.32-1.64.32-.52 0-.98-.073-1.38-.22-.4-.16-.74-.367-1.02-.62a2.68 2.68 0 0 1-.64-.94c-.133-.36-.2-.747-.2-1.16 0-.547.113-1.013.34-1.4.24-.4.567-.727.98-.98.413-.253.893-.44 1.44-.56.56-.12 1.16-.18 1.8-.18h1.2v-.58c0-.44-.14-.76-.42-.96-.267-.213-.647-.32-1.14-.32-.387 0-.787.06-1.2.18-.4.12-.847.313-1.34.58l-.92-1.76Zm5.04 4.52-.86.02c-.813.027-1.38.167-1.7.42-.32.24-.48.533-.48.88 0 .453.133.767.4.94.28.16.593.24.94.24s.673-.1.98-.3c.32-.2.56-.433.72-.7v-1.5Zm10.813-3.44h-2.54v4.4c0 .453.1.767.3.94.213.16.493.24.84.24.266 0 .54-.027.82-.08.28-.053.506-.127.68-.22l.4 1.86c-.227.107-.567.213-1.02.32-.454.107-.934.16-1.44.16-1.16 0-1.987-.227-2.48-.68-.494-.467-.74-1.16-.74-2.08v-4.86h-1.48v-1.92h1.48v-2.94h2.64v2.94h2.54v1.92ZM46.023 46v-9.54h2.06l.3 1.72c.227-.507.587-.953 1.08-1.34.494-.387 1.114-.58 1.86-.58.307 0 .58.033.82.1s.44.147.6.24l-.44 2.1a2.257 2.257 0 0 0-.56-.2 2.848 2.848 0 0 0-.8-.1c-.653 0-1.2.22-1.64.66-.426.427-.64 1.133-.64 2.12V46h-2.64Zm15.785-4.08h-6.34V42c0 .76.267 1.327.8 1.7.534.373 1.22.56 2.06.56.534 0 1-.053 1.4-.16a7.337 7.337 0 0 0 1.12-.38l.48 1.86c-.36.173-.813.32-1.36.44-.546.133-1.193.2-1.94.2-.72 0-1.4-.093-2.04-.28-.626-.2-1.18-.5-1.66-.9-.466-.4-.84-.907-1.12-1.52-.28-.613-.42-1.347-.42-2.2 0-.76.114-1.447.34-2.06.227-.627.547-1.16.96-1.6.427-.44.934-.78 1.52-1.02.587-.253 1.24-.38 1.96-.38 1.294 0 2.32.393 3.08 1.18.774.787 1.16 1.887 1.16 3.3v1.18Zm-2.72-1.82c0-.253-.033-.5-.1-.74a1.556 1.556 0 0 0-.28-.62 1.44 1.44 0 0 0-.5-.44c-.2-.107-.446-.16-.74-.16-.533 0-.973.18-1.32.54-.346.36-.553.847-.62 1.46l3.56-.04Zm4.672 5.9V31.72h2.62V46h-2.62Zm5.175 0V31.72h2.62V46h-2.62Zm14.376-4.84c0 .787-.127 1.493-.38 2.12a4.598 4.598 0 0 1-1.06 1.6c-.44.427-.96.76-1.56 1-.6.227-1.247.34-1.94.34a5.75 5.75 0 0 1-1.94-.32 4.437 4.437 0 0 1-1.54-.94 4.55 4.55 0 0 1-1.02-1.52c-.24-.613-.36-1.307-.36-2.08 0-.813.127-1.533.38-2.16.253-.64.6-1.173 1.04-1.6.453-.44.98-.773 1.58-1 .6-.227 1.247-.34 1.94-.34.693 0 1.333.107 1.92.32.6.213 1.113.527 1.54.94.44.4.78.907 1.02 1.52.253.613.38 1.32.38 2.12Zm-2.74.1c0-.547-.06-1.013-.18-1.4s-.28-.7-.48-.94c-.2-.24-.433-.413-.7-.52-.267-.12-.54-.18-.82-.18-.28 0-.547.053-.8.16-.253.093-.48.26-.68.5-.2.227-.36.533-.48.92s-.18.873-.18 1.46c0 .52.06.973.18 1.36.12.373.28.68.48.92.213.24.447.42.7.54.267.12.54.18.82.18.28 0 .547-.047.8-.14.253-.107.48-.28.68-.52.2-.24.36-.547.48-.92.12-.387.18-.86.18-1.42Z"
      fill="#fff"
    />
  </svg>
)

export default LogoSvg