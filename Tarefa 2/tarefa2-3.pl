#####################################################################################
# Tarefa 2 - Linguagem de Programação Script - 2017.2								#
# Questão 2.3																		#
# Autor: Erick Kelvin																#
#####################################################################################

my %hosts;

$hosts{'Host1'} = '192.168.0.1';
$hosts{'Host2'} = '192.168.0.2';

sub inserir_host{
	print "\n== Inserir host\n";
	print "Digite o nome do host: ";
	my $host_name = <STDIN>;
	chomp $host_name;

	print "Digite o endereço do host: ";
	my $host_address = <STDIN>;
	chomp $host_address;

	$hosts{$host_name} = $host_address;

	print "\nHost inserido com sucesso!\n";
}

sub mostrar_hosts{
	print "\n== Mostrar hosts\n";
	print "$_\t $hosts{$_}\n" for (keys %hosts);
}

sub buscar_host{
	print "\n== Buscar host\n";
	print "Nome do host: ";
	my $host_name = <STDIN>;
	chomp $host_name;
	print "\n=== Resultado da busca\n";
	if($hosts{$host_name}!="") {
		print "$host_name\t $hosts{$host_name}\n";
	}
	else {
		print "Host não encontrado!\n";
	}
}

sub remover_host{
	print "\n== Remover host\n";
	print "Nome do host: ";
	my $host_name = <STDIN>;
	chomp $host_name;
	if($hosts{$host_name}!="") {
		delete $hosts{$host_name};
		print "Host removido com sucesso!\n";
	}
	else {
		print "Host não encontrado!\n";
	}
}

sub alterar_host{
	print "\n== Alterar host\n";
	print "Nome do host: ";
	my $host_name = <STDIN>;
	chomp $host_name;
	if($hosts{$host_name}!="") {
		print "Novo endereço do host: ";
		my $host_address = <STDIN>;
		chomp $host_address;

		$hosts{$host_name} = $host_address;

		print "Host alterado com sucesso!\n";
	}
	else {
		print "Host não encontrado!\n";
	}
}


print "\nBem-vindo ao gerenciador de hosts!\n";

while(true) {
	print "\n= MENU\n";
	print "[1] Inserir host\n[2] Mostrar hosts\n[3] Buscar host\n[4] Remover host\n[5] Alterar host\n[0] Sair do programa\n";
	my $option = <STDIN>;
	chomp $option;
	if ($option eq 1) {
		inserir_host();
	}
	elsif ($option eq 2) {
		mostrar_hosts();
	}
	elsif ($option eq 3) {
		buscar_host();
	}
	elsif ($option eq 4) {
		remover_host();
	}
	elsif ($option eq 5) {
		alterar_host();
	}
	elsif ($option eq 0) {
		exit(0);
	}
	print "\nPressione <ENTER> para voltar ao menu...";
	<STDIN>;
}