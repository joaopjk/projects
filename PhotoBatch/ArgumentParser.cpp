#pragma once
#include <string>

#include "ArgumentParser.h"
#include "Utils.h"

void ArgumentParser::RegisterFlag(const std::string& flag)
{
	if (!flag.empty())
	{
		m_Flags[flag] = false;
	}
};

void ArgumentParser::RegisterOption(const std::string& option)
{
	if (!option.empty())
	{
		m_Options[option] = "";
	}
}

bool ArgumentParser::GetFlag(const std::string& flag) const // não pode alterar a classe
{
	if (!flag.empty())
	{
		auto flagIt = m_Flags.find(flag);//std::map<std::string, bool>::iterator flagIt = m_flags.find(flag);
		if (flagIt != std::end(m_Flags))
		{
			return flagIt->second;
		}
	}
	return false;
};

std::string ArgumentParser::GetOption(const std::string& option) const
{
	if (!option.empty())
	{
		auto optionIt = m_Options.find(option);
		if (optionIt != std::end(m_Options))
			return optionIt->second;
	}

	static std::string emptyOption = "";
	return emptyOption;
}

float ArgumentParser::GetOptionAsFloat(const std::string& option) const
{
	const std::string& optionValue = GetOption(option);
	if (!optionValue.empty())
	{
		return std::stof(optionValue);
	}
	return -1;
}


int ArgumentParser::GetOptionAsInt(const std::string& option) const
{
	const std::string& optionValue = GetOption(option);
	if (!optionValue.empty())
	{
		return std::stoi(optionValue);
	}
	return -1;
}

void ArgumentParser::Parse(int argc, char* argv[])
{
	if (argc > 1)
	{
		for (size_t i = 1; i < argc; ++i)
		{
			std::string arg = Utils::ToLower(argv[i]);
			if (arg.length() >= 3)
			{
				if (arg[0] == '-' && arg[1] == '-')
				{
					arg = arg.substr(2);
					if (arg.find_first_of('=') != std::string::npos)
					{
						const size_t equalSignPos = arg.find('=');
						if(equalSignPos != std::string::npos)
						{
							std::string optionName = Utils::ToLower(arg.substr(0, equalSignPos));
							std::string optionvalue = Utils::ToLower(arg.substr(equalSignPos + 1));

							auto optionIt = m_Options.find(optionName);
							if (optionIt != std::end(m_Options))
							{
								optionIt->second = optionvalue;
							}
						}
					}
					else
					{
						auto flagIt = m_Flags.find(arg);
						if (flagIt != std::end(m_Flags))
						{
							flagIt->second = true;
						}
					}
				}
			}
		}
	}
};