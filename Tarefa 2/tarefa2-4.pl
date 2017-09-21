#####################################################################################
# Tarefa 2 - Linguagem de Programação Script - 2017.2								#
# Questão 2.4																		#
# Autor: Erick Kelvin																#
#####################################################################################

my %hosts;

for (my $i=1; $i <= 100; $i++) {
   $hosts{'Host' . $i} = '192.168.0.' . $i;
}

print "$_\t $hosts{$_}\n" for (sort { substr($a, 4) <=> substr($b, 4)  }keys %hosts);