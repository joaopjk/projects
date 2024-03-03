#pragma once
#include <string>

namespace Utils
{
	std::string ToLower(std::string str);
	const std::string& GetInvalidChars();
	bool HasInvalidChar(const std::string& str);
}