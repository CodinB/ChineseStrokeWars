using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace CharacterDecomposer.Models
{
    public class DictionaryService
    {
        static void Main(string[] args)
        {
            var traditionalDict = new Dictionary<string, Definition>();
            var simplifiedDict = new Dictionary<string, Definition>();

            foreach (var line in File.ReadLines(@"C:\Users\briun\Downloads\C-Cedit-API\cccedict-master\demo\cedict_1_0_ts_utf-8_mdbg\cedict_ts.u8"))
            {
                if (line.StartsWith("#"))
                    continue;


                var match = Regex.Match(line, @"^(\S+)\s+(\S+)\s+\[(.+?)\]\s+/(.+)/");

                if (!match.Success)
                {
                    Console.WriteLine($"ERROR: {line}");
                    continue;
                }

                var traditional = match.Groups[1].Value;
                var simplified = match.Groups[2].Value;

                var definition = new Definition
                {
                    Romanization = match.Groups[3].Value,
                    Definitions = match.Groups[4].Value.Split('/')
                };

                traditionalDict[traditional] = definition;
                simplifiedDict[simplified] = definition;
            }


            Definition def;
            if (simplifiedDict.TryGetValue("詞彙判斷任務", out def))
            {
                Console.WriteLine(def);
            }
            else if (traditionalDict.TryGetValue("詞彙判斷任務", out def))
            {

                Console.WriteLine(def);
            }
            else
            {
                Console.WriteLine("Entry Not Found");

            }

            Console.ReadLine();
        }
    }
}