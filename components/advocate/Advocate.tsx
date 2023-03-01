import { Props } from "./interfaces.ts";
import Button from "$store/components/ui/Button.tsx";

function Advocate(props: Props) {
  const { title, content, cta } = props;

  return (
    <div class="w-full flex items-center justify-center bg-gray-100 px-16">
      <div class="max-w-[989px] flex items-center justify-center flex-col py-16">
        <h2 class="font-title text-7xl uppercase mb-2">{title}</h2>
        <p class="text-center text-lg">{content}</p>
        <Button class="mt-4">{cta}</Button>
      </div>
    </div>
  );
}

export default Advocate;
