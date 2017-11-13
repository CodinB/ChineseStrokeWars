using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HanziScraper
{
    class Testing
    {
        static void Main(string[] args)
        {
            CharacterDecomposer characterDecomposer = new CharacterDecomposer();
            var results = characterDecomposer.GetCharacterBreakdown("意");
            foreach(var result in results)
            {
                Console.WriteLine(result);
            }
        }
    }
}
