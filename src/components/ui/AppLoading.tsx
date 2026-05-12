type Props = {
  label?: string;
};

export default function AppLoading({ label = "Loading QuotePadPro..." }: Props) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center gap-4 bg-white px-8 py-7 text-center">
        <div className="flex h-14 w-14 items-center justify-center">
          <img
            src="/favicon/favicon-96x96.png"
            alt="QuotePadPro loading"
            className="h-8 w-8 animate-spin"
            />
        </div>
      </div>
    </div>
  );
}