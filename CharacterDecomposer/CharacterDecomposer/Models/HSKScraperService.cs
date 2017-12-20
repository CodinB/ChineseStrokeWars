using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CharacterDecomposer.Models
{
    public class HSKScraperService
    {
        public List<HSKWords> GetHskWords()
        {
            using (SqlConnection con = new SqlConnection("data source =.;database=HSK1-6_Words; integrated security=SSPI"))
            {
                con.Open();

                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Words_Get_Random";

                using (SqlDataReader dr = cmd.ExecuteReader())
                {
                    List<HSKWords> results = new List<HSKWords>();
                    while (dr.Read())
                    {
                        HSKWords word = new HSKWords();
                        word.Id = dr.GetInt32(0);
                        word.Word = dr.GetString(1);
                        word.Hsklevel = dr.GetInt32(2);

                        results.Add(word);
                    }
                    return results;
                }
            }
        }
    }
}