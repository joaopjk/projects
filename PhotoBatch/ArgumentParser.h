#pragma once
#include <string>
#include <map>

class ArgumentParser
{
public:
	void RegisterFlag(const std::string& flag);
	void RegisterOption(const std::string& option);
	bool GetFlag(const std::string& flag) const; // não pode alterar a classe
	template<typename T> T GetOptionAs(const std::string& option) const;
	template<>
	float GetOptionAs(const std::string& option) const {return GetOptionAsFloat(option); }
	template<>
	int GetOptionAs(const std::string& option) const { return GetOptionAsInt(option); }
	template<>
	std::string GetOptionAs(const std::string& option) const { return GetOption(option); }
	void Parse(int argc, char* argv[]);
private:
	std::map<std::string, bool> m_Flags;
	std::map<std::string, std::string> m_Options;
	std::string GetOption(const std::string& option) const;
	float GetOptionAsFloat(const std::string& option) const;
	int GetOptionAsInt(const std::string& option) const;
};