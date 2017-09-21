#####################################################################################
# Tarefa 2 - Linguagem de Programação Script - 2017.2								#
# Questão 2.2																		#
# Autor: Erick Kelvin																#
#####################################################################################

#####################################################################################
# A função sort_array recebe um vetor com N valores e a ordem (0 para crescente		#
# ou 1 para decrescente) como parâmetros. Depois, são feitas as chamadas de função	#
# para mostrar os resultados no terminal.											#
#####################################################################################


sub sort_array{
	my @original_arr = @{$_[0]}; #recebe vetor original
	my $sort_order = $_[1]; #recebe tipo de ordem a ser usado
	my @sorted_arr;

	if ($sort_order == 0) {
		@sorted_arr = sort { $a <=> $b } @original_arr; #ordem crescente
	}
	elsif ($sort_order == 1) {
		@sorted_arr = sort { $b <=> $a } @original_arr; #ordem decrescente
	}

	return @sorted_arr;
}

print "Dê um tamanho para o vetor a ser gerado: ";
my $arr_size = <STDIN>;
chomp $arr_size;

my @arr = map { int(rand(100)) } ( 1..$arr_size );

print "\n# Vetor original: \n";
print join ("\n", @arr);

print "\n\n# Vetor ordenado em ordem crescente: \n";
print join ("\n", (sort_array(\@arr,0)));

print "\n\n# Vetor ordenado em ordem decrescente: \n";
print join ("\n", (sort_array(\@arr,1)));

print "\n\n"