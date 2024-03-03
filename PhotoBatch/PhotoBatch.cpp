#include <iostream>
#include <iomanip>
#include <array>
#include <algorithm>
#include <filesystem>

#include "ArgumentParser.h"
#include "Utils.h"

namespace Args
{
	namespace Flags
	{
		static constexpr const char* Rename = "rename";
		static constexpr const char* Convert = "convert";
		static constexpr const char* Resize = "resize";
		static constexpr const char* Scale = "scale";
	}

	namespace Options
	{
		static constexpr const char* Folder = "folder";
		static constexpr const char* Filter = "filter";
		static constexpr const char* Width = "width";
		static constexpr const char* Height = "height";
		static constexpr const char* Amount = "amount";
		static constexpr const char* Prefix = "Prefix";
		static constexpr const char* StartNumber = "StartNumber";
		static constexpr const char* From = "from";
		static constexpr const char* To = "to";
	}
}

void ValidateFlagsArguments(const ArgumentParser& argParser)
{
	const bool bRenameMode = argParser.GetFlag(Args::Flags::Rename);
	const bool bConvertMode = argParser.GetFlag(Args::Flags::Convert);
	const bool bResizeMode = argParser.GetFlag(Args::Flags::Resize);
	const bool bScaleMode = argParser.GetFlag(Args::Flags::Scale);

	const std::array<bool, 4> modes = { bRenameMode, bResizeMode, bScaleMode, bConvertMode };
	const std::ptrdiff_t numActivesModes = std::count(std::begin(modes), std::end(modes), true);

	//if (!(bRenameMode ^ bConvertMode ^ bResizeMode ^ bScaleMode))
	if (numActivesModes != 1)
	{
		throw std::invalid_argument("Somente um modo pode estar ativo!");
	}

	const std::string folder = argParser.GetOptionAs<std::string>(Args::Options::Folder);
	if (folder.empty())
	{
		throw std::invalid_argument("A pasta não pode estar em branco!");
	}

	if (!std::filesystem::exists(folder))
	{
		throw std::invalid_argument("A pasta informada não existe!");
	}

	const std::string filter = argParser.GetOptionAs<std::string>(Args::Options::Folder);
	if (!filter.empty())
	{
		bool hasInvalidChar = Utils::HasInvalidChar(filter);
		if (hasInvalidChar)
		{
			throw std::invalid_argument("O Filter contém caracteres invalidos!" + Utils::GetInvalidChars());
		}
	}

	if (bResizeMode)
	{
		int width{ 0 }, height{ 0 };
		try
		{
			width = argParser.GetOptionAs<int>(Args::Options::Width);
			height = argParser.GetOptionAs<int>(Args::Options::Height);
		}
		catch (const std::exception&)
		{
			throw std::invalid_argument("Width e/ou Hight não são números válidos!");
		}

		if (width <= 0 || height <= 0)
		{
			throw std::invalid_argument("Width e/ou Hight devem ser maiores do que 0!");
		}

		if (filter.empty())
		{
			throw std::invalid_argument("A option Filter não pode estar vazia no mode Resize!");
		}
	}

	if (bScaleMode)
	{
		float amount{ 0 };
		try
		{
			amount = argParser.GetOptionAs<float>(Args::Options::Amount);
		}
		catch (const std::exception&)
		{
			throw std::invalid_argument("Amout deve ser um valor númerico!");
		}

		if (amount <= 0.0f)
		{
			throw std::invalid_argument("Amount deve ser maior que 0!");
		}

		if (filter.empty())
		{
			throw std::invalid_argument("A option Filter não pode estar vazia no mode Resize!");
		}
	}

	if (bRenameMode)
	{
		int startNumber{ -1 };
		try
		{
			startNumber = argParser.GetOptionAs<int>(Args::Options::StartNumber);
		}
		catch (const std::exception&)
		{
			throw std::invalid_argument("StartNumber deve ser númerico!");
		}

		std::string prefix = argParser.GetOptionAs<std::string>(Args::Options::Prefix);

		if (startNumber < 0)
		{
			throw std::invalid_argument("StartNumber deve ser maior ou igual a zero!");
		}

		if (prefix.empty() || Utils::HasInvalidChar(prefix))
		{
			throw std::invalid_argument("Prefix não pode estar em branco e não conter os seguintes caracteres : " + Utils::GetInvalidChars());
		}
	}

	if (bConvertMode)
	{
		const std::string from = argParser.GetOptionAs<std::string>(Args::Options::From);
		const std::string to = argParser.GetOptionAs<std::string>(Args::Options::To);
		const std::array<std::string, 2> convertOptions = { "jpg", "png" };

		const bool isFromValid =
			std::find(std::begin(convertOptions), std::end(convertOptions), from) !=
			std::end(convertOptions);

		const bool isToValid =
			std::find(std::begin(convertOptions), std::end(convertOptions), to) !=
			std::end(convertOptions);

		if (!isFromValid || !isToValid)
		{
			throw std::invalid_argument("O From e To devem ser jpg ou png!");
		}

		if (from == to)
		{
			throw std::invalid_argument("O From e To devem ser diferentes!");
		}
	}
}


void RegisterOps(ArgumentParser& argParser)
{
	argParser.RegisterFlag(Args::Flags::Rename);
	argParser.RegisterFlag(Args::Flags::Convert);
	argParser.RegisterFlag(Args::Flags::Resize);
	argParser.RegisterFlag(Args::Flags::Scale);

	argParser.RegisterOption(Args::Options::Folder);
	argParser.RegisterOption(Args::Options::Filter);
	argParser.RegisterOption(Args::Options::Amount);
	argParser.RegisterOption(Args::Options::Height);
	argParser.RegisterOption(Args::Options::Width);
	argParser.RegisterOption(Args::Options::Prefix);
	argParser.RegisterOption(Args::Options::StartNumber);
	argParser.RegisterOption(Args::Options::From);
	argParser.RegisterOption(Args::Options::To);
}

void ViewOps(ArgumentParser& argParser)
{
	std::cout << std::boolalpha << "Rename	: " << argParser.GetFlag(Args::Flags::Rename) << std::endl;
	std::cout << std::boolalpha << "Convert	: " << argParser.GetFlag(Args::Flags::Convert) << std::endl;
	std::cout << std::boolalpha << "Resize	: " << argParser.GetFlag(Args::Flags::Resize) << std::endl;
	std::cout << std::boolalpha << "Scale	: " << argParser.GetFlag(Args::Flags::Scale) << std::endl;
	std::cout << "Folder: " << argParser.GetOptionAs<std::string>(Args::Options::Folder) << std::endl;
	std::cout << "Filter: " << argParser.GetOptionAs<std::string>(Args::Options::Filter) << std::endl;
	std::cout << "Width: " << argParser.GetOptionAs<int>(Args::Options::Width) << std::endl;
	std::cout << "Height: " << argParser.GetOptionAs<int>(Args::Options::Height) << std::endl;
	std::cout << "Amount: " << argParser.GetOptionAs<float>(Args::Options::Amount) << std::endl;
	std::cout << "Prefix: " << argParser.GetOptionAs<std::string>(Args::Options::Prefix) << std::endl;
	std::cout << "StartNumber: " << argParser.GetOptionAs<int>(Args::Options::StartNumber) << std::endl;
	std::cout << "From: " << argParser.GetOptionAs<std::string>(Args::Options::From) << std::endl;
	std::cout << "To: " << argParser.GetOptionAs<std::string>(Args::Options::To) << std::endl;
}

int main(int argc, char* argv[])
{
	setlocale(LC_ALL, "pt_BR");
	setlocale(LC_NUMERIC, "en_US");

	ArgumentParser argParser;

	RegisterOps(argParser);
	ViewOps(argParser);

	argParser.Parse(argc, argv);

	try
	{
		ValidateFlagsArguments(argParser);
	}
	catch (const std::exception& ex)
	{
		std::cerr << ex.what() << std::endl;
	}

	return 0;
}