import { Props } from "./interfaces.ts";

function JoinUs(props: Props) {
  const { title, content } = props;

  return (
    <div class="w-full flex items-center justify-center">
      <div class="max-w-[989px] flex items-center justify-center flex-col py-16">
        <h2 class="font-title text-6xl uppercase mb-2">{title}</h2>
        <p class="text-center text-lg">{content}</p>
      </div>
    </div>
  );
}

export default JoinUs;
