import React from "react";

const NewsletterBox = () => {
  const onSubmiteHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className=" text-center">
      <p className="text-2x1 font-medium text-gray-800">
        Подпишитесь сейчас & получите скидку 20%
      </p>
      <p className="text-gray-400 mt-3">
        Выгодные предложения на избранные модели — стиль стал ещё доступнее.
        Успейте воспользоваться до конца акции!
      </p>
      <form
        onSubmit={onSubmiteHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          ПОДПИСАТЬСЯ
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
