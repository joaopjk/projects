#include <string>
#include <algorithm>
#include <string>

#include "Utils.h"

namespace Utils
{
	std::string ToLower(std::string str)
	{
		/*for (char& c : str)
			c = std::tolower(c);*/
		std::transform(std::begin(str), std::end(str), std::begin(str),
			[](unsigned char c)
			{
				return std::tolower(c);
			});
		return str;
	}

	const std::string& GetInvalidChars()
	{
		static const std::string invalidCharacters = "\\*?\"<>|";
		return invalidCharacters;
	}

	bool HasInvalidChar(const std::string& str)
	{
		return str.find_first_of(GetInvalidChars()) != std::string::npos;
	}
}